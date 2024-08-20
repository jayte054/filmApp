import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from '@nestjs/jwt';
import { AuthDto, SignInDto, UpdateUserDto } from "./authDto";
import { AuthModuleRepository } from "./authRepository";
import { AuthObject, JwtPayload } from "./types";
import { AuthEntity } from "./authEntity";

@Injectable()
export class AuthService {
   constructor(@InjectRepository(AuthModuleRepository)
   private authModuleRepository: AuthModuleRepository,
   private jwtService: JwtService,
   ) {} 

   async registerUser(authDto: AuthDto): Promise<AuthObject> {
    return await this.authModuleRepository.registerUser(authDto);
   }

   async registerAdminUser(authDto: AuthDto): Promise<AuthObject> {
    return await this.authModuleRepository.registerAdminUser(authDto);
   }

   async userSignIn(signInDto: SignInDto): Promise<{accessToken: string}> {
    const userDetails = await this.authModuleRepository.userSignIn(signInDto)

    const {authId, email, isAdmin, fullName} = userDetails;

    if(!userDetails) {
        throw new UnauthorizedException('invalid credentials')
    }
    const payload: JwtPayload = {
        email,
        authId,
        fullName,
        isAdmin,
    }
    try{
    const accessToken = await this.jwtService.sign(payload)
        const response = {
            accessToken: accessToken,
            user: userDetails,
        }
        return response;
    }catch(error) {
        throw new InternalServerErrorException("failed to sign in")
    }

   }

   async fetchUsers(user: AuthEntity): Promise<AuthEntity[]> {
    return await this.authModuleRepository.fetchUsers(user)
   }

   async updateUser(user: AuthEntity, updateUserDto: UpdateUserDto, authId: string): Promise<AuthEntity> {
    return await this.authModuleRepository.updateUser(user, updateUserDto, authId);
   }
}