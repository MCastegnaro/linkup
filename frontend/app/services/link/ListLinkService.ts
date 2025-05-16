/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpStatusCode } from "@/app/data/interfaces/http";

interface ListLinkResponse {
  links: {
    personal?: Array<any>;
    work?: Array<any>;
    educational?: Array<any>;
  };
  linksFounded: number;
}

export interface PublicLinkResponse {
  fullname: string;
  avatar: string;
  bio: string;
  links: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

export class ListLinkService {
  constructor(
    private readonly httpClient: HttpClient<
      ListLinkResponse | PublicLinkResponse
    >,
    private readonly path = "/links"
  ) {}

  async list(userId: string): Promise<ListLinkResponse> {
    const { statusCode, body } = await this.httpClient.request({
      method: "get",
      url: `${this.path}/${userId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body as ListLinkResponse;
      default:
        throw new Error();
    }
  }

  async listPublic(username: string): Promise<PublicLinkResponse> {
    const { statusCode, body } = await this.httpClient.request({
      method: "get",
      url: `public/user/${username}`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body as PublicLinkResponse;
      default:
        throw new Error();
    }
  }
}
