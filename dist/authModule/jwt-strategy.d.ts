import { JwtPayload } from './types';
import { AuthModuleRepository } from './authRepository';
import { AuthEntity } from './authEntity';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private authRepository;
    constructor(authRepository: AuthModuleRepository);
    validate(payload: JwtPayload): Promise<AuthEntity>;
}
export {};
