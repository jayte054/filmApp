import { Module } from "@nestjs/common";
import { PassportModule } from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import config from 'config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./authController";
import { AuthEntity } from "./authEntity";
import { AuthModuleRepository } from "./authRepository";
import { AuthService } from "./authService";
import { JwtStrategy } from "./jwt-strategy";

const jwtConfig: any | unknown = config.get('jwt');

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    TypeOrmModule.forFeature([
      AuthEntity,
      AuthModuleRepository,
    ]),
  ],
  providers: [JwtStrategy, AuthModuleRepository, AuthService],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],

})
export class AuthModule {}