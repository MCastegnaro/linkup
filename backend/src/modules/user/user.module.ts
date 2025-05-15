import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkEntity } from 'src/config/database/entities/link.entity';
import { UserEntity } from 'src/config/database/entities/user.entity';
import { PublicUserController } from './publicUser.controller';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, LinkEntity])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController, PublicUserController],
})
export class UserModule {}
