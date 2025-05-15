import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sanitize } from 'src/common/helpers/sanitize.helper';
import { LinkEntity } from 'src/config/database/entities/link.entity';
import { UserEntity } from 'src/config/database/entities/user.entity';
import { Repository } from 'typeorm';
import { ListByUserResponseDto } from '../dto/find-all-links.dto';
import { CreateLinkDto, LinkDto, UpdateLinkDto } from '../dto/link.dto';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(LinkEntity)
    private linkRepository: Repository<LinkEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(link: CreateLinkDto): Promise<LinkDto> {
    console.log({ link });
    const userFound = await this.usersRepository.findOne({
      where: { id: link.userId },
    });

    if (!userFound) {
      throw new NotFoundException(`User with ID ${link.userId} not found`);
    }

    const linkToSave = this.linkRepository.create({
      title: Sanitize.input(link.title),
      description: Sanitize.input(link.description!),
      category: link.category,
      user: userFound,
    });

    const createdLink = await this.linkRepository.save(linkToSave);

    return this.mapEntityToDto(createdLink);
  }

  async list(userId: string): Promise<ListByUserResponseDto> {
    const userFound = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!userFound) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const linksFound = await this.linkRepository.find({
      where: {
        user: { id: userId },
      },
    });

    const totalFound = linksFound.length;

    const groupedLinks: Record<string, any[]> = {};

    for (const link of linksFound) {
      const dto = this.mapEntityToDto(link);

      const category = dto.category || 'uncategorized';

      if (!groupedLinks[category]) {
        groupedLinks[category] = [];
      }

      groupedLinks[category].push(dto);
    }

    return {
      linksFounded: totalFound,
      links: groupedLinks,
    };
  }

  async patch(id: string, link: UpdateLinkDto): Promise<LinkDto> {
    const linkFound = await this.linkRepository.findOne({
      where: { id },
    });

    if (!linkFound) {
      throw new NotFoundException(`Link with ID ${id} not found`);
    }

    const linkToUpdate = this.linkRepository.create({
      ...linkFound,
      ...link,
    });

    await this.linkRepository.update(id, this.mapDtoToEntity(linkToUpdate));

    return this.mapEntityToDto(linkToUpdate);
  }

  async remove(id: string) {
    const linkFound = await this.linkRepository.findOne({
      where: { id },
    });

    if (!linkFound) {
      throw new NotFoundException(`Link with ID ${id} not found`);
    }

    const result = await this.linkRepository.delete(id);

    if (!result.affected) {
      throw new BadRequestException(`Link with id '${id}' not found`);
    }
  }

  private mapEntityToDto(linkEntity: LinkEntity): LinkDto {
    return {
      id: linkEntity.id,
      title: linkEntity.title,
      description: linkEntity.description,
      category: linkEntity.category,
    };
  }

  private mapDtoToEntity(linkDto: LinkDto): Partial<LinkEntity> {
    return {
      title: linkDto.title,
      description: linkDto.description,
      category: linkDto.category,
    };
  }
}
