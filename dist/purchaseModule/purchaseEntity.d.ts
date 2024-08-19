import { AuthEntity } from "src/authModule/authEntity";
import { BaseEntity } from "typeorm";
import { PaidStatus } from "./types";
export declare class PurchaseEntity extends BaseEntity {
    purchaseId: string;
    title: string;
    film_Id: string;
    price: string;
    status: PaidStatus;
    date: string;
    user: AuthEntity;
    userAuthId: string;
}
