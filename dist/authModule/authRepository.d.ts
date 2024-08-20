import { DataSource, Repository } from "typeorm";
import { AuthDto, SignInDto, UpdateUserDto } from "./authDto";
import { AuthEntity } from "./authEntity";
import { AuthObject, SignInObject } from "./types";
export declare class AuthModuleRepository extends Repository<AuthEntity> {
    private dataSource;
    constructor(dataSource: DataSource);
    registerUser(authDto: AuthDto): Promise<AuthObject>;
    registerAdminUser(authDto: AuthDto): Promise<AuthObject>;
    userSignIn(signInDto: SignInDto): Promise<SignInObject>;
    fetchUserById(authId: string): Promise<AuthEntity>;
    fetchUsers(user: AuthEntity): Promise<AuthEntity[]>;
    updateUser(user: AuthEntity, updateUserDto: UpdateUserDto, authId: string): Promise<AuthEntity>;
}
