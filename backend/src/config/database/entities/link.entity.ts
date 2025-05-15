import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

export enum LinkCategoryEnum {
  WORK = 'work',
  EDUCATION = 'education',
  PERSONAL = 'personal',
}

@Entity({ name: 'link' })
export class LinkEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description?: string;

  @Column({ type: 'varchar' })
  category: LinkCategoryEnum;

  @ManyToOne(() => UserEntity, (user) => user.links, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
