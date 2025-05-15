import { OmitType } from '@nestjs/mapped-types';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { LinkCategoryEnum } from 'src/config/database/entities/link.entity';

export class LinkDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(256)
  title: string;

  @IsString()
  @MaxLength(512)
  description?: string;

  @IsEnum(LinkCategoryEnum)
  @IsOptional()
  category: LinkCategoryEnum;
}

export class CreateLinkDto extends OmitType(LinkDto, ['id'] as const) {
  @IsUUID()
  userId: string;
}

export class UpdateLinkDto extends OmitType(LinkDto, ['id'] as const) {}
