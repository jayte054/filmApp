import { JwtService } from '@nestjs/jwt';
import { AuthDto, SignInDto, UpdateUserDto } from "./authDto";
import { AuthModuleRepository } from "./authRepository";
import { AuthObject } from "./types";
import { AuthEntity } from "./authEntity";
export declare class AuthService {
    private authModuleRepository;
    private jwtService;
    constructor(authModuleRepository: AuthModuleRepository, jwtService: JwtService);
    registerUser(authDto: AuthDto): Promise<AuthObject>;
    registerAdminUser(authDto: AuthDto): Promise<AuthObject>;
    userSignIn(signInDto: SignInDto): Promise<{
        accessToken: string;
    }>;
    updateUser(user: AuthEntity, updateUserDto: UpdateUserDto, authId: string): Promise<AuthEntity>;
}
