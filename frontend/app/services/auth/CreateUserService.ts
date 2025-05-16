import { HttpClient, HttpStatusCode } from "@/app/data/interfaces/http";
import { CreateUserParams } from "@/app/data/interfaces/user";

export class CreateUserService {
  constructor(
    private readonly httpClient: HttpClient<void>,
    private readonly path = "/auth/register"
  ) {}

  async create(params: CreateUserParams): Promise<void> {
    const url = new URL(this.path, process.env.NEXT_PUBLIC_API_URL);

    const { statusCode } = await this.httpClient.request({
      method: "post",
      url: `${url}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: params,
    });

    switch (statusCode) {
      case HttpStatusCode.created:
        return;
      default:
        throw new Error();
    }
  }
}
