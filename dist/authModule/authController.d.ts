import { AuthDto, SignInDto, UpdateUserDto } from "./authDto";
import { AuthEntity } from "./authEntity";
import { AuthService } from "./authService";
import { AuthObject } from "./types";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(authDto: AuthDto): Promise<AuthObject>;
    registerAdminUser(authDto: AuthDto): Promise<AuthObject>;
    userSignIn(signInDto: SignInDto): Promise<{
        accessToken: string;
    }>;
    updateUser(user: AuthEntity, updateUserDto: UpdateUserDto, authId: string): Promise<AuthEntity>;
}
