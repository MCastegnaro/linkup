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

export class ListLinkService {
  constructor(
    private readonly httpClient: HttpClient<ListLinkResponse>,
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
}
