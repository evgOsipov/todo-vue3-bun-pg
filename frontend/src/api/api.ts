import axios, {
  type AxiosError,
  type AxiosResponse, type InternalAxiosRequestConfig,
  type RawAxiosRequestConfig,
} from 'axios';

import type { ApiServerRequestBody, ApiServerRequestParams, ApiServerResponse } from '../interfaces/api/api.ts';

export abstract class Api {
  private static axiosInstance = axios.create();

  static addInterceptor(
    cb: (error: AxiosError) => any,
  ) {
    this.axiosInstance.interceptors.response.use((ctx) => {
      return ctx;
    }, cb);
  };

  static async repeatRequest(request: InternalAxiosRequestConfig) {
    await this.axiosInstance.request(request);
  }

  protected static async _get<
    TResult extends ApiServerResponse,
    TParams extends ApiServerRequestParams | undefined = undefined,
  >(url: string, params?: TParams): Promise<TResult> {
    try {
      const response = await this.axiosInstance.get<
        TResult,
        AxiosResponse<TResult, TParams>,
        TParams
      >(url, {
        params,
      });
      return response?.data;
    } catch (e) {
      throw e;
    }
  }

  protected static async _post<
    TResult extends ApiServerResponse,
    TBody extends ApiServerRequestBody | undefined = undefined,
  >(
    url: string,
    body: TBody | undefined = undefined,
    params?: RawAxiosRequestConfig,
  ): Promise<TResult> {
    try {
      const response = await this.axiosInstance.post<
        TResult,
        AxiosResponse<TResult, TBody>,
        TBody
      >(
        url,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          ...params,
        },
      );
      return response?.data;
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }

  protected static async _put<
    TResult extends ApiServerResponse,
    TBody extends ApiServerRequestBody | undefined = undefined,
  >(url: string, body?: TBody): Promise<TResult> {
    const response = await this.axiosInstance.put<
      TResult,
      AxiosResponse<TResult, TBody>,
      TBody
    >(url, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }

  protected static async _delete<
    TResult extends ApiServerResponse,
    TParams extends ApiServerRequestParams | undefined = undefined,
  >(url: string, params?: TParams): Promise<TResult> {
    const response = await this.axiosInstance.delete<
      TResult,
      AxiosResponse<TResult, TParams>,
      TParams
    >(url, {
      params,
    });
    return response.data;
  }
}
