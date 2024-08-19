import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { AuthEntity } from "src/authModule/authEntity";
import { GetUser } from "src/authModule/getUserDecorator/getUserDecorator";
import { PurchaseEntity } from "./purchaseEntity";
import { PurchaseFilmDto } from "./purchaseFilmDto";
import { PurchaseService } from "./PurchaseService";
import { PurchaseObject } from "./types";

@Controller('purchase')
export class PurchaseController {
    constructor(private readonly purchaseService: PurchaseService) {}

    @Post('/purchaseFilm/:filmId')
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    async purchaseFilm(
        @GetUser() user: AuthEntity,
        @Param('filmId') filmId: string
    ): Promise<PurchaseObject> {
        console.log(filmId)
        return await this.purchaseService.purchaseFilm(
            user,
            filmId
        )
    }

    @Get('/getPurchases')
    @UseGuards(AuthGuard())
    async getPurchases(@GetUser() user: AuthEntity): Promise<PurchaseEntity[]> {
        return await this.purchaseService.getPurchases(user)
    }

     @Get('/getFilmPurchaseByUserId/:userAuthId')
    @UseGuards(AuthGuard())
    async getFilmPurchaseByUserId(@GetUser() user: AuthEntity, @Param('userAuthId') userAuthId: string){
        return await this.purchaseService.getFilmPurchaseByUserId(user, userAuthId)
    }
}