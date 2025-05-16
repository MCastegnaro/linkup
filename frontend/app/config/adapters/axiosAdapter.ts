/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from "@/app/data/interfaces/http";
import axios, { AxiosResponse } from "axios";

const axiosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export class AxiosAdapter implements HttpClient {
  async request(params: HttpRequest): Promise<HttpResponse<any>> {
    let httpResponse: AxiosResponse<any>;

    try {
      httpResponse = await axiosApi.request({
        url: params.url,
        method: params.method,
        data: params.body,
        headers: params.headers,
      });
    } catch (error: any) {
      httpResponse = error.response;
    }

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
      headers: httpResponse.headers,
    };
  }
}
