import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LinkEntity } from './link.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  avatar: string;

  @Column({ type: 'varchar' })
  bio: string;

  @Column({ type: 'varchar' })
  fullname: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', name: 'password' })
  password: string;

  @Column({ default: true })
  isBioPublic: boolean;

  @Column({ default: true })
  isAvatarPublic: boolean;

  @Column({ default: true })
  isLinksPublic: boolean;

  @Column({ default: true })
  isUsernamePublic: boolean;

  @OneToMany(() => LinkEntity, (link) => link.user)
  links: LinkEntity[];
}
