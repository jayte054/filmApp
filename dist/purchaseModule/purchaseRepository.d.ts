import { AuthEntity } from "src/authModule/authEntity";
import { FilmService } from "src/filmModule/filmService";
import { DataSource, Repository } from "typeorm";
import { PurchaseEntity } from "./purchaseEntity";
import { PurchaseObject } from "./types";
export declare class PurchaseRepository extends Repository<PurchaseEntity> {
    private dataSource;
    private filmService;
    constructor(dataSource: DataSource, filmService: FilmService);
    purchaseFilm(user: AuthEntity, filmId: string): Promise<PurchaseObject>;
    getPurchases(user: AuthEntity): Promise<PurchaseEntity[]>;
    _getPurchases(): Promise<PurchaseEntity[]>;
    getFilmPurchaseByUserId(user: AuthEntity, userAuthId: string): Promise<number>;
}
