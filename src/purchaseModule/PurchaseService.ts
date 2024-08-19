import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthEntity } from "src/authModule/authEntity";
import { PurchaseEntity } from "./purchaseEntity";
import { PurchaseFilmDto } from "./purchaseFilmDto";
import { PurchaseRepository } from "./purchaseRepository";
import { PurchaseObject } from "./types";

@Injectable()
export class PurchaseService {
    constructor(@InjectRepository(PurchaseRepository)
    private purchaseRepository: PurchaseRepository
    ) {} 

    async purchaseFilm(user: AuthEntity, filmId: string): Promise<PurchaseObject> {
        return await this.purchaseRepository.purchaseFilm(user, filmId)
    }

    async getPurchases(user: AuthEntity): Promise<PurchaseEntity[]> {
        return await this.purchaseRepository.getPurchases(user)
    }

    async getFilmPurchaseByUserId( user: AuthEntity, userAuthId: string) {
        return await this.purchaseRepository.getFilmPurchaseByUserId(user, userAuthId)
    }
}