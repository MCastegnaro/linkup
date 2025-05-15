import { Controller, Get, Param } from '@nestjs/common';
import { PublicUserDto, UsernameRouteParameters } from './dto/user.dto';
import { UserService } from './services/user.service';

@Controller('public')
export class PublicUserController {
  constructor(private readonly userService: UserService) {}

  @Get('/user/:username')
  async get(
    @Param() params: UsernameRouteParameters,
  ): Promise<PublicUserDto | null> {
    return await this.userService.getPublic(params.username);
  }
}
