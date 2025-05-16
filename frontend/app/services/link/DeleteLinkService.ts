import { HttpClient, HttpStatusCode } from "@/app/data/interfaces/http";

export class DeleteLinkService {
  constructor(
    private readonly httpClient: HttpClient<void>,
    private readonly path = "/links"
  ) {}

  async remove(linkId: string): Promise<void> {
    const { statusCode } = await this.httpClient.request({
      method: "delete",
      url: `${this.path}/${linkId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    switch (statusCode) {
      case HttpStatusCode.noContent:
        return;
      default:
        throw new Error();
    }
  }
}
