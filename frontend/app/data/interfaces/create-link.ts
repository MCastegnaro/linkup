export interface CreateLinkParams {
  title: string;
  description: string;
  category: string;
  userId: string;
}

export interface CreateLinkResponseDto {
  id: string;
  title: string;
  description: string;
  category: string;
}
