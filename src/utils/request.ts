const COOKIES = require('universal-cookie');
import axios, { AxiosPromise } from 'axios';
import { config } from 'config';

const authHeader = () => {
  const cookies = new COOKIES();
  const data = cookies.get('auth');

  if (data) {
    return {
      ['authorization']: `Basic ${data}`,
    };
  }

  return null;
};

export default {
  get(url: string,
      options: any = {
        skipAuth: false,
        prependUrl: true,
      }): AxiosPromise {
    return axios.get(
      options.prependUrl ? `${config.apiUrl}${url}` : url,
      {
        headers: Object.assign(
          {},
          options.skipAuth ? null : authHeader(),
          options.headers,
        ),
      });
  },
  post(url: string,
       body?: any,
       options: any = {
         skipAuth: false,
         prependUrl: true,
       }): AxiosPromise {
    return axios.post(
      options.prependUrl ? `${config.apiUrl}${url}` : url,
      body,
      {
        headers: Object.assign(
          {},
          options.skipAuth ? null : authHeader(),
          options.headers,
        ),
        onUploadProgress: options.onUploadProgress,
      });
  },
  put(url: string,
      body?: any,
      options: any = {
        skipAuth: false,
        prependUrl: true,
        headers: null,
      }): AxiosPromise {
    return axios.put(
      options.prependUrl ? `${config.apiUrl}${url}` : url,
      body,
      {
        headers: Object.assign(
          {},
          options.skipAuth ? null : authHeader(),
          options.headers,
        ),
        onUploadProgress: options.onUploadProgress,
      });
  },
  delete(url: string,
         options: any = {
           skipAuth: false,
           prependUrl: true,
         }): AxiosPromise {
    return axios.delete(
      options.prependUrl ? `${config.apiUrl}${url}` : url,
      {
        headers: Object.assign(
          {},
          options.skipAuth ? null : authHeader(),
          options.headers,
        ),
      });
  },
};
