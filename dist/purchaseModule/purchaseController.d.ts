import { AuthEntity } from "src/authModule/authEntity";
import { PurchaseEntity } from "./purchaseEntity";
import { PurchaseService } from "./PurchaseService";
import { PurchaseObject } from "./types";
export declare class PurchaseController {
    private readonly purchaseService;
    constructor(purchaseService: PurchaseService);
    purchaseFilm(user: AuthEntity, filmId: string): Promise<PurchaseObject>;
    getPurchases(user: AuthEntity): Promise<PurchaseEntity[]>;
    getFilmPurchaseByUserId(user: AuthEntity, userAuthId: string): Promise<number>;
}
