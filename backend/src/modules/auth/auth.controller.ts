import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  CreateSessionDto,
  CreateUserDto,
  CreateUserResponse,
} from '../user/dto/user.dto';
import { UserService } from '../user/services/user.service';
import { AuthResponseDto } from './dto/auth.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() auth: CreateSessionDto): Promise<AuthResponseDto> {
    return await this.authService.signIn(auth);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() user: CreateUserDto): Promise<CreateUserResponse> {
    return await this.userService.create(user);
  }
}
