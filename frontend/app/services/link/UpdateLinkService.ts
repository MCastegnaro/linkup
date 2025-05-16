import { HttpClient, HttpStatusCode } from "@/app/data/interfaces/http";
import {
  UpdateLinkParams,
  UpdateLinkResponseDto,
} from "@/app/data/interfaces/update-link";

export class UpdateLinkService {
  constructor(
    private readonly httpClient: HttpClient<UpdateLinkResponseDto>,
    private readonly path = "/links"
  ) {}

  async patch(params: UpdateLinkParams): Promise<UpdateLinkResponseDto> {
    const { statusCode, body } = await this.httpClient.request({
      method: "patch",
      url: `${this.path}/${params.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: params,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body as UpdateLinkResponseDto;
      default:
        throw new Error();
    }
  }
}
