import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { AuthEntity } from "src/authModule/authEntity";
import { FilmService } from "src/filmModule/filmService";
import { DataSource, Repository } from "typeorm";
import { PurchaseEntity } from "./purchaseEntity";
import { PurchaseFilmDto } from "./purchaseFilmDto";
import { PaidStatus, PurchaseObject } from "./types";

@Injectable()
export class PurchaseRepository extends Repository<PurchaseEntity> {
    constructor (
        private dataSource: DataSource,
        private filmService: FilmService
    ) { super (PurchaseEntity, dataSource.createEntityManager())}

    //purchase film 
    async purchaseFilm(user: AuthEntity, filmId: string): Promise<PurchaseObject> {
        // const {title, film_Id, price} = purchaseFilmDto
        console.log(user, filmId)
        const film = await this.filmService._getFilmWithId(filmId)
        console.log(film)
        const purchaseFilm = new PurchaseEntity()

        purchaseFilm.title = film.title;
        purchaseFilm.film_Id = filmId;
        purchaseFilm.price = film.price;
        purchaseFilm.status = PaidStatus.paid
        purchaseFilm.date = new Date().toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    });
        purchaseFilm.user = user;
        console.log(purchaseFilm)
        try {
            await purchaseFilm.save()
            return {
                title: purchaseFilm.title,
                film_Id: purchaseFilm.film_Id, 
                price: purchaseFilm.price,
                status: purchaseFilm.status,
                date: purchaseFilm.date,
            }
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException(" failed to purchase film")
        }
    }

    //fetch purchased films uniquw to indivisual users
    async getPurchases(user:AuthEntity): Promise<PurchaseEntity[]> {
        const query = await this.createQueryBuilder('title')
        query.where("title.userAuthId = :userAuthId", {userAuthId: user.authId})

        const films = await query.getMany()
        try {
            return films;
        }catch (error) {
            throw new InternalServerErrorException(`failed to retrieve purchases`)
        }
    }

    //fetchPurchased film without requiring authorization, used internally, within the app
    async _getPurchases(): Promise<PurchaseEntity[]> {
         const query = await this.createQueryBuilder('title')

        const films = await query.getMany()
        try {
            return films;
        }catch (error) {
            throw new InternalServerErrorException(`failed to retrieve purchases`)
        }
    }

    // fetch number of films purchase by particular users
    async getFilmPurchaseByUserId(user: AuthEntity, userAuthId: string) {
        if (user.isAdmin !== true) {
            throw new ConflictException("not allowed")
        }

        let purchaseObject: { [key: string]: any[] } = {}
        const purchases = await this._getPurchases()

        purchases.forEach(purchase => {
            if(purchase.userAuthId === userAuthId) {
                if (!purchaseObject[userAuthId]) {
                purchaseObject[userAuthId] = [];
            }
                purchaseObject[userAuthId].push(purchase)
            } 
        })

        return purchaseObject[userAuthId] ? purchaseObject[userAuthId].length : 0;
    }
}