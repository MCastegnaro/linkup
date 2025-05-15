import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { CreateSessionDto } from 'src/modules/user/dto/user.dto';
import { UserService } from 'src/modules/user/services/user.service';
import { AuthResponseDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    ) as number;
  }

  async signIn(params: CreateSessionDto): Promise<AuthResponseDto> {
    const foundUser = await this.userService.findByUserName(params.username);

    if (!foundUser || !bcryptCompareSync(params.password, foundUser.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: foundUser.id, username: foundUser.username };

    const token = this.jwtService.sign(payload);

    return { token, expiresIn: this.jwtExpirationTimeInSeconds };
  }
}
