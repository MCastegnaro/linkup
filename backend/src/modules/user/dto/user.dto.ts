import { OmitType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class PublicUserDto {
  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  fullname: string;

  @IsString()
  bio: string;

  @IsObject()
  links: any;
}

export class UserDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(25)
  username: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  password: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  fullname: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsBoolean()
  isBioPublic: boolean;

  @IsBoolean()
  isAvatarPublic: boolean;

  @IsBoolean()
  isLinksPublic: boolean;

  @IsBoolean()
  isUsernamePublic: boolean;
}

export class UserRouteParameters {
  @IsUUID()
  id: string;
}

export class UsernameRouteParameters {
  username: string;
}

export class CreateUserDto {
  id: string;
  username: string;
  fullname: string;
  password: string;
}

export interface CreateUserResponse {
  id: string;
  username: string;
}

export interface CreateSessionDto {
  username: string;
  password: string;
}

export class UpdateUserDto extends OmitType(UserDto, ['id'] as const) {}
