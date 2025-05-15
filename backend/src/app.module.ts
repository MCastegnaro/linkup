import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './config/database/db.module';
import { AuthModule } from './modules/auth/auth.module';
import { LinkModule } from './modules/link/link.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    DbModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    LinkModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
