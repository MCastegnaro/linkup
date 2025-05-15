import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateUserDto, UserDto, UserRouteParameters } from './dto/user.dto';
import { UserService } from './services/user.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('/:id')
  async patch(
    @Param() params: UserRouteParameters,
    @Body() link: UpdateUserDto,
  ): Promise<Partial<UserDto>> {
    return await this.userService.patch(params.id, link);
  }
}
