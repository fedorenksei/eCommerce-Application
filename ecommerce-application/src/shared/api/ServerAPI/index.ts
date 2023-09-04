import store from '../../../app/store';
import {
  CategoryData,
  CustomerData,
  LoginData,
  NewCustomerInfo,
  ProductRequestParams,
} from '../../types/interfaces';
import { setAuth } from '../../store/isAuthSlice';
import { setCustomerData } from '../../store/customerDataSlice';
import { setFiltersState } from '../../store/filtersSlice';
import { getFiltersParams } from '../../utils/getFiltersParams';
import { setCategories } from '../../store/categoriesSlice';
import { CustomerUpdateAction } from '../../types/types';

export class ServerAPI {
  private static instance: ServerAPI;
  private accessToken: string | null;
  private refreshToken: string | null;
  private customerID: string | null;
  private customerInfo: null | (CustomerData & { version: number });
  private readonly prefix: string;
  private readonly KEY: string;
  private readonly CLIENT_ID: string;
  private readonly CLIENT_SECRET: string;
  private readonly SCOPE: string;
  private readonly REGION: string;
  private readonly AUTH_URL: string;
  private readonly API_URL: string;
  private readonly limit: number;

  constructor() {
    this.accessToken = null;
    this.refreshToken = null;
    this.customerID = null;
    this.customerInfo = null;
    this.limit = 9;
    this.prefix = 'nkj1k238sadQ';
    this.KEY = 'ecommerce-application-creative-team';
    this.CLIENT_ID = '2S2FwbXYw3IAoCFUFaIeHqAi';
    this.CLIENT_SECRET = 'D_NhGA6rYxPkWwCXKQWe7u3nIu-u3viM';
    this.SCOPE = 'manage_project:ecommerce-application-creative-team';
    this.REGION = 'us-central1';
    this.AUTH_URL = 'https://auth.us-central1.gcp.commercetools.com';
    this.API_URL = 'https://api.us-central1.gcp.commercetools.com';
    // this.prefix = 'testprefix';
    // this.KEY = '1213123';
    // this.CLIENT_ID = '8qsbF1nw1R9NjCihwGWVHvJs';
    // this.CLIENT_SECRET = 'hysbumzI1UcK-LRED6LRZwgtOi2roufT';
    // this.SCOPE = 'manage_project:1213123';
    // this.REGION = 'ueurope-west1';
    // this.AUTH_URL = 'https://auth.europe-west1.gcp.commercetools.com';
    // this.API_URL = 'https://api.europe-west1.gcp.commercetools.com';
  }

  public static getInstance() {
    if (!ServerAPI.instance) {
      ServerAPI.instance = new ServerAPI();
    }
    return ServerAPI.instance;
  }

  public async preflight() {
    this.loadTokens();

    if (this.refreshToken) {
      const isUpdated = await this.updateTokens();
      if (isUpdated === false) {
        this.getCommonToken();
      }
    } else {
      this.getCommonToken();
    }

    const categoriesId: Record<string, string> = {};
    const categories: CategoryData[] = await this.getCategories(true);
    categories.forEach(({ name: { en: categoryName }, id }) => {
      categoriesId[categoryName] = id;
    });
    store.dispatch(setCategories(categoriesId));
  }

  private loadTokens() {
    this.accessToken = localStorage.getItem(`${this.prefix}-access-token`);
    this.refreshToken = localStorage.getItem(`${this.prefix}-refresh-token`);
  }

  private saveTokens(accessToken: string, refreshToken?: string) {
    localStorage.setItem(`${this.prefix}-access-token`, accessToken);
    this.accessToken = accessToken;
    if (refreshToken) {
      localStorage.setItem(`${this.prefix}-refresh-token`, refreshToken);
      this.refreshToken = refreshToken;
    }
  }

  private async updateTokens() {
    const link = `${this.AUTH_URL}/oauth/token?grant_type=refresh_token&refresh_token=${this.refreshToken}`;

    let isOk = false;
    let res = null;

    try {
      const response = await fetch(link, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(
            `${this.CLIENT_ID}:${this.CLIENT_SECRET}`,
          )}`,
        },
      });

      isOk = response.ok;

      if (isOk) {
        res = await response.json();
      }
    } catch (e) {
      console.log(e);
    }

    if (isOk) {
      this.saveTokens(res.access_token);
      await this.getCustomerInfo();
      store.dispatch(
        setAuth({
          isAuth: true,
        }),
      );
      return isOk;
    }

    return isOk;
  }

  private async getCommonToken() {
    const link = `${this.AUTH_URL}/oauth/token?grant_type=client_credentials`;
    let token = '';

    try {
      const response = await fetch(link, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(
            `${this.CLIENT_ID}:${this.CLIENT_SECRET}`,
          )}`,
        },
      });
      const res = await response.json();
      token = res.access_token;
    } catch (e) {
      console.log(e);
    }

    if (!token) return;
    this.saveTokens(token);
  }

  public async createNewCustomer(customerInfo: NewCustomerInfo) {
    const link = `${this.API_URL}/${this.KEY}/customers`;
    let isOk = false;

    try {
      const response = await fetch(link, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify(customerInfo),
      });
      isOk = response.ok;
    } catch (e) {
      console.log(e);
    }

    if (isOk) {
      this.loginCustomer({
        email: customerInfo.email,
        password: customerInfo.password,
      });
    }
    return isOk;
  }

  public async updateCustomer(actions: CustomerUpdateAction[]) {
    const link = `${this.API_URL}/${this.KEY}/customers/${this.customerID}`;
    let isOk = false;
    let res = null;

    try {
      const response = await fetch(link, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify({
          version: this.customerInfo!.version,
          actions,
        }),
      });

      isOk = response.ok;

      if (isOk) {
        res = await response.json();
      }
    } catch (e) {
      console.log(e);
    }

    if (isOk) {
      this.customerID = res.id;
      this.customerInfo = {
        ...res,
      };
      store.dispatch(
        setCustomerData({
          customerInfo: { ...res },
        }),
      );
    }

    return isOk;
  }

  public async loginCustomer(loginData: LoginData) {
    const email = encodeURIComponent(loginData.email);
    const password = encodeURIComponent(loginData.password);
    const link = `${this.AUTH_URL}/oauth/${this.KEY}/customers/token?grant_type=password&username=${email}&password=${password}`;
    let isOk = false;
    let res = null;

    try {
      const response = await fetch(link, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(
            `${this.CLIENT_ID}:${this.CLIENT_SECRET}`,
          )}`,
        },
      });
      isOk = response.ok;

      if (isOk) {
        res = await response.json();
      }
    } catch (e) {
      console.log(e);
    }

    if (isOk) {
      this.saveTokens(res.access_token, res.refresh_token);
      await this.getCustomerInfo();
      store.dispatch(
        setAuth({
          isAuth: true,
        }),
      );
    }

    return isOk;
  }

  public async checkPassword(password: string) {
    return await this.loginCustomer({
      password,
      email: this.customerInfo?.email || '',
    });
  }

  private async getCustomerInfo() {
    const link = `${this.API_URL}/${this.KEY}/me`;
    let isOk = false;
    let res = null;

    try {
      const response = await fetch(link, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      isOk = response.ok;

      if (isOk) {
        res = await response.json();
      }
    } catch (e) {
      console.log(e);
    }

    if (isOk) {
      this.customerID = res.id;
      this.customerInfo = {
        ...res,
      };
      store.dispatch(
        setCustomerData({
          customerInfo: { ...res },
        }),
      );
    }
  }

  public async resetPassword(password: string) {
    let token = '';
    try {
      const link = `${this.API_URL}/${this.KEY}/customers/password-token`;
      const response = await fetch(link, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify({
          email: this.customerInfo?.email,
        }),
      });
      token = (await response.json()).value;
    } catch (e) {
      console.log(e);
    }

    if (!token) return false;

    let isOk = null;
    try {
      const link = `${this.API_URL}/${this.KEY}/customers/password/reset`;
      const response = await fetch(link, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify({
          tokenValue: token,
          newPassword: password,
        }),
      });
      isOk = response.ok;
      console.log(isOk);
    } catch (e) {
      console.log(e);
    }

    return isOk;
  }

  public async getCategories(onlyMain = false) {
    const link = `${this.API_URL}/${this.KEY}/categories`;
    let res = null;

    try {
      const response = await fetch(link, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      const result = await response.json();
      res = result.results;
    } catch (e) {
      console.log(e);
    }

    if (res) {
      res = onlyMain
        ? res.filter((cat: CategoryData) => cat.ancestors.length === 0)
        : res;

      return res;
    }
  }

  getProducts = async ({
    categoryId = null,
    size = null,
    color = null,
    gender = null,
    style = null,
    priceRange = null,
    searchText = null,
    sort = null,
    page = null,
  }: ProductRequestParams) => {
    let filterParams = '';
    if (size) {
      filterParams += `filter.query=variants.attributes.size:${size}&`;
    }
    if (color) {
      filterParams += `filter.query=variants.attributes.color.label.en:${color}&`;
    }
    if (gender) {
      filterParams += `filter.query=variants.attributes.gender.label:${gender}&`;
    }
    if (style) {
      filterParams += `filter.query=variants.attributes.style.label:${style}&`;
    }
    if (priceRange) {
      filterParams += `filter.query=variants.price.centAmount:range (${priceRange.min} to ${priceRange.max})&`;
    }
    if (searchText) {
      filterParams += `text.en="${searchText}"&`;
    }
    if (page) {
      filterParams += `offset=${this.limit * (Number(page) - 1)}&`;
    }
    if (sort) {
      switch (sort) {
        case 'nameAsc':
          filterParams += 'sort=name.en asc&';
          break;
        case 'nameDesc':
          filterParams += 'sort=name.en desc&';
          break;
        case 'priceAsc':
          filterParams += 'sort=price asc&';
          break;
        case 'priceDesc':
          filterParams += 'sort=price desc&';
          break;
      }
    }
    const categoryParams = categoryId
      ? `filter.query=categories.id:subtree("${categoryId}")&`
      : '';
    const facetParams = `facet=variants.attributes.gender.label&facet=variants.attributes.color.label.en&facet=variants.attributes.size&facet=variants.attributes.style.label&facet=variants.price.centAmount`;
    const limitParams = `limit=${this.limit}&`;
    const searchParams = `${limitParams}${categoryParams}${filterParams}${facetParams}`;
    const link = `${this.API_URL}/${this.KEY}/product-projections/search?${searchParams}`;

    let res = null;

    try {
      const response = await fetch(link, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      const result = await response.json();
      res = result;
    } catch (e) {
      console.log(e);
    }

    const results = res.results;
    console.log(res);
    const params = getFiltersParams(res.facets);
    console.log(params);

    store.dispatch(setFiltersState(params));
    return { results, filterParams: params, total: res.total };
  };

  public async logout() {
    localStorage.removeItem(`${this.prefix}-access-token`);
    localStorage.removeItem(`${this.prefix}-refresh-token`);
    this.accessToken = null;
    this.refreshToken = null;
    store.dispatch(
      setAuth({
        isAuth: false,
      }),
    );
    store.dispatch(
      setCustomerData({
        customerInfo: null,
      }),
    );
    await this.getCommonToken();
  }
}

//! TODO удалить лишние консоль логи
