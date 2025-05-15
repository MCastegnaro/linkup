import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkEntity } from 'src/config/database/entities/link.entity';
import { UserEntity } from 'src/config/database/entities/user.entity';
import { LinkController } from './link.controller';
import { LinkService } from './services/link.service';

@Module({
  imports: [TypeOrmModule.forFeature([LinkEntity, UserEntity])],
  controllers: [LinkController],
  providers: [LinkService],
  exports: [LinkService],
})
export class LinkModule {}
