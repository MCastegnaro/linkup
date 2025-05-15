/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { LinkEntity } from 'src/config/database/entities/link.entity';
import { UserEntity } from 'src/config/database/entities/user.entity';
import { Repository } from 'typeorm';
import {
  CreateUserDto,
  CreateUserResponse,
  PublicUserDto,
  UpdateUserDto,
  UserDto,
} from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,

    @InjectRepository(LinkEntity)
    private linksRepository: Repository<LinkEntity>,
  ) {}

  async getPublic(username: string): Promise<PublicUserDto | null> {
    const userFound = await this.usersRepository.findOne({
      where: { username },
    });

    if (!userFound) {
      throw new NotFoundException('User not found!');
    }

    const linksByUser = await this.linksRepository.find({
      where: {
        user: { username },
      },
      select: {
        id: true,
        title: true,
        description: true,
      },
    });

    return {
      fullname: userFound.fullname,
      avatar: userFound.avatar,
      bio: userFound.bio,
      links: linksByUser.map((link) => ({
        id: link.id,
        title: link.title,
        description: link.description,
      })),
    };
  }

  async create(newUser: CreateUserDto): Promise<CreateUserResponse> {
    const { username, password, fullname } = newUser;

    const userExists = await this.findByUserName(username);

    if (userExists) {
      throw new ConflictException(`User '${username}' already registered!`);
    }

    const hashedPassword = this.hashPassword(password);

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
      fullname,
    });

    const savedUser = await this.usersRepository.save(user);

    return {
      id: savedUser.id,
      username: savedUser.username,
    };
  }

  async findByUserName(username: string): Promise<Partial<UserDto> | null> {
    const userFound = await this.usersRepository.findOne({
      where: { username },
    });

    if (!userFound) {
      return null;
    }

    return {
      id: userFound.id,
      username: userFound.username,
      password: userFound.password,
      fullname: userFound.username,
    };
  }

  async patch(id: string, user: UpdateUserDto): Promise<Partial<UserDto>> {
    const userFound = await this.usersRepository.findOne({
      where: { id },
    });

    if (!userFound) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const userToUpdate = this.usersRepository.create({
      ...userFound,
      ...user,
    });

    await this.usersRepository.update(id, this.mapDtoToEntity(userToUpdate));

    return this.mapEntityToDto(userToUpdate);
  }

  private hashPassword(password: string): string {
    return bcryptHashSync(password, 10);
  }

  private mapEntityToDto(userEntity: UserEntity): Partial<UserDto> {
    return {
      id: userEntity.id,
      fullname: userEntity.fullname,
      password: userEntity.password,
      username: userEntity.username,
    };
  }

  private mapDtoToEntity(userDto: UserDto): Partial<UserEntity> {
    return {
      username: userDto.username,
      fullname: userDto.fullname,
      password: userDto.password,
      avatar: userDto.avatar,
      bio: userDto.bio,
      email: userDto.email,
      isAvatarPublic: userDto.isAvatarPublic,
      isBioPublic: userDto.isBioPublic,
      isLinksPublic: userDto.isLinksPublic,
      isUsernamePublic: userDto.isUsernamePublic,
    };
  }
}
