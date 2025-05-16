export interface CreateSessionParams {
  username: string;
  password: string;
}

export interface CreateSessionParamsResponse {
  token?: string;
  expiresIn?: string;
  message?: string;
  statusCode?: number;
}
