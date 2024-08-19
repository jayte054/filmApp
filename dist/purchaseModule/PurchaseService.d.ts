import { AuthEntity } from "src/authModule/authEntity";
import { PurchaseEntity } from "./purchaseEntity";
import { PurchaseRepository } from "./purchaseRepository";
import { PurchaseObject } from "./types";
export declare class PurchaseService {
    private purchaseRepository;
    constructor(purchaseRepository: PurchaseRepository);
    purchaseFilm(user: AuthEntity, filmId: string): Promise<PurchaseObject>;
    getPurchases(user: AuthEntity): Promise<PurchaseEntity[]>;
    getFilmPurchaseByUserId(user: AuthEntity, userAuthId: string): Promise<number>;
}
