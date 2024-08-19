import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/authModule/authModule";
import { FilmModule } from "src/filmModule/filmModule";
import { FilmRepository } from "src/filmModule/filmRepository";
import { FilmService } from "src/filmModule/filmService";
import { PurchaseController } from "./purchaseController";
import { PurchaseEntity } from "./purchaseEntity";
import { PurchaseRepository } from "./purchaseRepository";
import { PurchaseService } from "./PurchaseService";

@Module({
    imports: [
        AuthModule, 
        TypeOrmModule.forFeature([
            PurchaseEntity,
        ]),
    FilmModule],
    providers: [PurchaseEntity, PurchaseRepository, PurchaseService],
    controllers: [PurchaseController]
})

export class PurchaseModule {}