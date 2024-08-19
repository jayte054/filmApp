import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import config from 'config';
import { JwtPayload } from './types';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthModuleRepository } from './authRepository';
import { AuthEntity } from './authEntity';

const jwtConfig: any | unknown = config.get('jwt');

//====== jwt strategy ========

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AuthModuleRepository)
    private authRepository: AuthModuleRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || jwtConfig.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<AuthEntity> {
    const { authId, email, fullName, isAdmin } = payload;

    const userQueryBuilder = this.authRepository.createQueryBuilder('user');
    userQueryBuilder
      .select([
        'user.authId',
        'user.email',
        'user.fullName',
        'user.password',
        'user.salt',
        'user.isAdmin',
      ])
      .where('user.email = :email', {
        email,
        authId,
        fullName,
        isAdmin,
      });

    const [user] = await Promise.all([
      userQueryBuilder.getOne(),
    ]);

    if (!user) {
      throw new UnauthorizedException(`unauthourized`);
    } else {
      return user;
    }
  }
}
