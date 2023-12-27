import store from '../../../app/store';
import {
  CategoryData,
  CustomerData,
  LineItem,
  LoginData,
  NewCustomerInfo,
  ProductRequestParams,
} from '../../types/interfaces';
import { setAuth } from '../../store/isAuthSlice';
import { setCustomerData } from '../../store/customerDataSlice';
import { setFiltersState } from '../../store/filtersSlice';
import { getFiltersParams } from '../../utils/getFiltersParams';
import { setCategories } from '../../store/categoriesSlice';
import { CustomerUpdateAction, CartUpdateAction } from '../../types/types';
import { setCart } from '../../store/cartSlice';
import { setDiscountCodes } from '../../store/discountCodesSlice';
import { getLineItem } from '../../utils/getLineItem';

export const DEFAULT_LIMIT = 12;

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
  // public static readonly DEFAULT_LIMIT: 12;

  constructor() {
    this.accessToken = null;
    this.refreshToken = null;
    this.customerID = null;
    this.customerInfo = null;
    this.prefix = 'nkj1k238sadQ';
    this.KEY = 'bikukle-shop';
    this.CLIENT_ID = 'icS9sbm4tcHGnM_7cmwDtwFE';
    this.CLIENT_SECRET = 'QAk1Fcj8gz220VmXC1Tusjh1KG3zSMWA';
    this.SCOPE = 'manage_project:bikukle-shop';
    this.REGION = 'us-central1';
    this.AUTH_URL = 'https://auth.us-central1.gcp.commercetools.com';
    this.API_URL = 'https://api.us-central1.gcp.commercetools.com';
  }

  public static getInstance() {
    if (!ServerAPI.instance) {
      ServerAPI.instance = new ServerAPI();
    }
    return ServerAPI.instance;
  }

  public async init() {
    await this.restoreUser();
    this.storeCart();
    this.storeCategories();
    this.storeDiscountCodes();
  }

  private async restoreUser() {
    this.getRefreshToken();

    if (this.refreshToken) {
      const isUpdated = await this.updateAccessToken();
      if (isUpdated === false) {
        await this.loginAnonymously();
      }
    } else {
      await this.loginAnonymously();
    }
  }

  private getRefreshToken() {
    this.refreshToken =
      localStorage.getItem(`${this.prefix}-identified-refresh-token`) ||
      localStorage.getItem(`${this.prefix}-anonymous-refresh-token`) ||
      localStorage.getItem(`${this.prefix}-refresh-token`);
  }

  private saveTokens({
    userType,
    accessToken,
    refreshToken,
  }: {
    userType: 'anonymous' | 'identified';
    accessToken: string;
    refreshToken?: string;
  }) {
    localStorage.setItem(
      `${this.prefix}-${userType}-access-token`,
      accessToken,
    );
    this.accessToken = accessToken;
    if (refreshToken) {
      localStorage.setItem(
        `${this.prefix}-${userType}-refresh-token`,
        refreshToken,
      );
      this.refreshToken = refreshToken;
    }
  }

  private async updateAccessToken() {
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
      this.accessToken = res.access_token;
      const isUserIdentified = await this.storeCustomerInfo();
      this.saveTokens({
        userType: isUserIdentified ? 'identified' : 'anonymous',
        accessToken: res.access_token,
      });
    }

    return isOk;
  }

  private async loginAnonymously() {
    const link = `${this.AUTH_URL}/oauth/${this.KEY}/anonymous/token?grant_type=client_credentials`;
    let result = null;

    try {
      const response = await fetch(link, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(
            `${this.CLIENT_ID}:${this.CLIENT_SECRET}`,
          )}`,
        },
      });

      if (response.ok) {
        result = await response.json();
      }
    } catch (e) {
      console.log(e);
    }

    if (result) {
      this.saveTokens({
        userType: 'anonymous',
        accessToken: result.access_token,
        refreshToken: result.refresh_token,
      });
    }
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
      this.saveTokens({
        userType: 'identified',
        accessToken: res.access_token,
        refreshToken: res.refresh_token,
      });
      this.storeCustomerInfo();
      this.storeCart();
    }

    return isOk;
  }

  public async logout() {
    localStorage.removeItem(`${this.prefix}-identified-access-token`);
    localStorage.removeItem(`${this.prefix}-identified-refresh-token`);

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

    this.accessToken = null;
    this.refreshToken = null;

    await this.restoreUser();
    this.storeCart();
  }

  private async storeCustomerInfo(): Promise<boolean> {
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
      store.dispatch(
        setAuth({
          isAuth: true,
        }),
      );
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

  public async checkPassword(password: string) {
    return await this.loginCustomer({
      password,
      email: this.customerInfo?.email || '',
    });
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

  public async storeCategories() {
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

    if (!res) return;

    const categories: CategoryData[] = res.filter(
      (cat: CategoryData) => cat.ancestors.length === 0,
    );
    const categoriesId: Record<string, string> = {};
    categories.forEach(({ name: { 'en-US': categoryName }, id }) => {
      categoriesId[categoryName] = id;
    });
    store.dispatch(setCategories(categoriesId));
  }

  public async getProducts({
    categoryId = null,
    material = null,
    color = null,
    gender = null,
    brand = null,
    priceRange = null,
    searchText = null,
    sort = null,
    limit,
    page = null,
  }: ProductRequestParams) {
    let filterParams = '';
    if (material) {
      filterParams += `filter.query=variants.attributes.material.label:${material}&`;
    }
    if (color) {
      filterParams += `filter.query=variants.attributes.color01.label:${color}&`;
    }
    if (gender) {
      filterParams += `filter.query=variants.attributes.gender-01.label.en-US:${gender}&`;
    }
    if (brand) {
      filterParams += `filter.query=variants.attributes.brand.label:${brand}&`;
    }
    if (priceRange) {
      filterParams += `filter.query=variants.price.centAmount:range (${priceRange.min} to ${priceRange.max})&`;
    }
    if (searchText) {
      filterParams += `text.en-US="${searchText}"&`;
    }

    const limitParams = `limit=${limit || DEFAULT_LIMIT}&`;
    if (page) {
      filterParams += `offset=${Number(limit) * (Number(page) - 1)}&`;
    }

    switch (sort) {
      case 'nameAsc':
        filterParams += 'sort=name.en-US asc&';
        break;
      case 'nameDesc':
        filterParams += 'sort=name.en-US desc&';
        break;
      case 'priceAsc':
        filterParams += 'sort=price asc&';
        break;
      case 'priceDesc':
        filterParams += 'sort=price desc&';
        break;
      default:
        filterParams += 'sort=createdAt desc&';
    }
    const categoryParams = categoryId
      ? `filter.query=categories.id:subtree("${categoryId}")&`
      : '';
    const facetParams = `facet=variants.attributes.gender-01.label.en-US&facet=variants.attributes.brand.label&facet=variants.attributes.material.label&facet=variants.attributes.color01.label&facet=variants.price.centAmount&`;
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
    const params = getFiltersParams(res.facets);

    store.dispatch(setFiltersState(params));
    return { results, filterParams: params, total: res.total };
  }

  public async getProduct(id: string) {
    const link = `${this.API_URL}/${this.KEY}/products/${id}`;
    let res = null;

    try {
      const response = await fetch(link, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      res = await response.json();
    } catch (e) {
      console.log(e);
    }

    //console.log(res);
    return res ? res : false;
  }

  private async storeCart() {
    let cart = await this.getActiveCart();
    if (!cart) {
      cart = await this.createCart();
    }

    // TODO: catch error
    if (!cart) return;

    const lineItems: LineItem[] = cart.lineItems.map(getLineItem);
    const discountCodeId = cart.discountCodes
      .filter(
        (item: { state: string; discountCode: { id: string } }) =>
          item.state === 'MatchesCart',
      )
      .map(
        (item: { discountCode: { id: string } }) => item.discountCode.id,
      )?.[0];

    const discountedPrice = 0;
    store.dispatch(
      setCart({
        version: cart.version,
        id: cart.id,
        lineItems,
        totalPrice: cart.totalPrice.centAmount,
        discountedPrice,
        discountCodeId,
        totalLineItemQuantity: cart.totalLineItemQuantity,
      }),
    );
  }

  private async getActiveCart() {
    const link = `${this.API_URL}/${this.KEY}/me/active-cart`;

    let result = null;
    try {
      const response = await fetch(link, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      if (response.ok) result = await response.json();
    } catch (e) {
      console.log(e);
    }

    return result;
  }

  private async createCart() {
    const link = `${this.API_URL}/${this.KEY}/me/carts`;

    let result = null;
    try {
      const response = await fetch(link, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify({
          currency: 'EUR',
        }),
      });

      if (response.ok) result = await response.json();
    } catch (e) {
      console.log(e);
    }

    return result;
  }

  private async storeDiscountCodes() {
    const link = `${this.API_URL}/${this.KEY}/discount-codes`;

    let result = null;
    try {
      const response = await fetch(link, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      if (response.ok) result = await response.json();
    } catch (e) {
      console.log(e);
    }

    if (!result) return;

    const discountCodes = result.results.map(
      (item: {
        id: string;
        name: { 'en-US': string };
        description: { 'en-US': string };
        code: string;
      }) => ({
        id: item.id,
        name: item.name['en-US'],
        description: item.description['en-US'],
        code: item.code,
      }),
    );
    store.dispatch(setDiscountCodes({ discountCodes }));
  }

  public async updateCart(actions: CartUpdateAction[]) {
    const { id, version } = store.getState().cart;
    const link = `${this.API_URL}/${this.KEY}/me/carts/${id}`;
    let isOk = false;
    //let res = null;

    try {
      const response = await fetch(link, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify({
          version,
          actions,
        }),
      });

      isOk = response.ok;

      if (isOk) {
        //res = await response.json();
      }
    } catch (e) {
      console.log(e);
    }

    if (isOk) {
      this.storeCart();
    }

    return isOk;
  }

  public async deleteCart() {
    const { id, version } = store.getState().cart;
    const link = `${this.API_URL}/${this.KEY}/carts/${id}?version=${version}`;

    let isOk = null;
    try {
      const response = await fetch(link, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      this.storeCart();
      if (response.ok) isOk = true;
    } catch (e) {
      console.log(e);
    }
    return isOk;
  }
}
//! TODO удалить лишние консоль логи
