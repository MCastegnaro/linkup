import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import {
  LinkRouteParameters,
  ListByUserResponseDto,
} from './dto/find-all-links.dto';
import { CreateLinkDto, LinkDto, UpdateLinkDto } from './dto/link.dto';
import { LinkService } from './services/link.service';

@UseGuards(AuthGuard)
@Controller('links')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get('/:id')
  async list(
    @Param() params: LinkRouteParameters,
  ): Promise<ListByUserResponseDto> {
    return this.linkService.list(params.id);
  }

  @Patch('/:id')
  async patch(
    @Param() params: LinkRouteParameters,
    @Body() link: UpdateLinkDto,
  ): Promise<LinkDto> {
    return await this.linkService.patch(params.id, link);
  }

  @Post()
  async create(@Body() link: CreateLinkDto): Promise<LinkDto> {
    return await this.linkService.create(link);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() params: LinkRouteParameters): Promise<void> {
    return await this.linkService.remove(params.id);
  }
}
