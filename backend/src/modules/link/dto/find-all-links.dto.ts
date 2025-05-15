import { IsArray, IsNumber, IsObject, IsUUID } from 'class-validator';
import { LinkCategoryEnum } from 'src/config/database/entities/link.entity';
import { LinkDto } from './link.dto';

export interface FindAllLinksParams {
  title?: string;
  category?: LinkCategoryEnum;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
}

export class LinkRouteParameters {
  @IsUUID()
  id: string;
}

export class FindAllLinksResponseDto {
  @IsArray()
  links: Array<LinkDto>;

  @IsNumber()
  totalCount: number;

  @IsNumber()
  linksFounded: number;
}

export class ListByUserResponseDto {
  @IsObject()
  links: Record<string, any[]>;

  @IsNumber()
  linksFounded: number;
}
