import { INewCustomerInfo } from '../../types/interfaces';

export class ServerAPI {
  private static instance: ServerAPI;
  private accessToken: string | null;
  private refreshToken: string | null;
  private readonly prefix: string;
  private readonly KEY: string;
  private readonly CLIENT_ID: string;
  private readonly CLIENT_SECRET: string;
  private readonly SCOPE: string;
  private readonly REGION: string;
  private readonly AUTH_URL: string;
  private readonly API_URL: string;

  constructor() {
    this.accessToken = null;
    this.refreshToken = null;
    this.prefix = 'nkj1k238sadQ';
    this.KEY = 'ecommerce-application-creative-team';
    this.CLIENT_ID = '2S2FwbXYw3IAoCFUFaIeHqAi';
    this.CLIENT_SECRET = 'D_NhGA6rYxPkWwCXKQWe7u3nIu-u3viM';
    this.SCOPE = 'manage_project:ecommerce-application-creative-team';
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

  public async preflight() {
    this.loadTokens();
    if (this.refreshToken) {
      this.updateTokens();
    } else {
      this.getCommonToken();
    }
  }

  private loadTokens() {
    this.accessToken = localStorage.getItem(`${this.prefix}-access-token`);
    this.refreshToken = localStorage.getItem(`${this.prefix}-refresh-token`);
  }

  private async updateTokens() {
    //! Доделать
    const refreshToken = localStorage.getItem('test-customer-refresh-token');

    const link = `${this.AUTH_URL}/oauth/token?grant_type=refresh_token&refresh_token=${refreshToken}`;

    const response = await fetch(link, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(
          `${this.CLIENT_ID}:${this.CLIENT_SECRET}`
        )}`,
      },
    });

    const res = await response.json();
    console.log(res);
  }

  private async getCommonToken() {
    const link = `${this.AUTH_URL}/oauth/token?grant_type=client_credentials`;
    let token = '';

    try {
      const response = await fetch(link, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(
            `${this.CLIENT_ID}:${this.CLIENT_SECRET}`
          )}`,
        },
      });
      const res = await response.json();
      token = res.access_token;
    } catch (e) {
      console.log(e);
    }

    if (!token) return;
    this.accessToken = token;
    localStorage.setItem(`${this.prefix}-access-token`, token);
  }

  public async createNewCustomer(customerInfo: INewCustomerInfo) {
    console.log('creating customer...');
    const link = `${this.API_URL}/${this.KEY}/customers`;

    const response = await fetch(link, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(customerInfo),
    });
    const res = await response.json();
    console.log(res);
  }
}
