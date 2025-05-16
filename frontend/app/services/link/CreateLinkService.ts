import {
  CreateLinkParams,
  CreateLinkResponseDto,
} from "@/app/data/interfaces/create-link";
import { HttpClient, HttpStatusCode } from "@/app/data/interfaces/http";

export class CreateLinkService {
  constructor(
    private readonly httpClient: HttpClient<CreateLinkResponseDto>,
    private readonly path = "/links"
  ) {}

  async create(
    userId: string,
    params: CreateLinkParams
  ): Promise<CreateLinkResponseDto> {
    const { statusCode, body } = await this.httpClient.request({
      method: "post",
      url: this.path,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: { ...params, userId },
    });

    switch (statusCode) {
      case HttpStatusCode.created:
        return body as CreateLinkResponseDto;
      case HttpStatusCode.noContent:
        return body as CreateLinkResponseDto;
      default:
        throw new Error();
    }
  }
}
