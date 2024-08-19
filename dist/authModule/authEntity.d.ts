import { BaseEntity } from "typeorm";
import { FilmEntity } from "src/filmModule/filmEntity";
import { PurchaseEntity } from "src/purchaseModule/purchaseEntity";
export declare class AuthEntity extends BaseEntity {
    authId: string;
    fullName: string;
    email: string;
    password: string;
    salt: string;
    isAdmin: boolean;
    filmId: FilmEntity;
    purchaseId: PurchaseEntity;
    validatePassword(password: string): Promise<boolean>;
}
