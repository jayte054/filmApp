"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseRepository = void 0;
const common_1 = require("@nestjs/common");
const filmService_1 = require("../filmModule/filmService");
const typeorm_1 = require("typeorm");
const purchaseEntity_1 = require("./purchaseEntity");
const types_1 = require("./types");
let PurchaseRepository = class PurchaseRepository extends typeorm_1.Repository {
    constructor(dataSource, filmService) {
        super(purchaseEntity_1.PurchaseEntity, dataSource.createEntityManager());
        this.dataSource = dataSource;
        this.filmService = filmService;
    }
    async purchaseFilm(user, filmId) {
        console.log(user, filmId);
        const film = await this.filmService._getFilmWithId(filmId);
        console.log(film);
        const purchaseFilm = new purchaseEntity_1.PurchaseEntity();
        purchaseFilm.title = film.title;
        purchaseFilm.film_Id = filmId;
        purchaseFilm.price = film.price;
        purchaseFilm.status = types_1.PaidStatus.paid;
        purchaseFilm.date = new Date().toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        purchaseFilm.user = user;
        try {
            await purchaseFilm.save();
            return {
                title: purchaseFilm.title,
                film_Id: purchaseFilm.film_Id,
                price: purchaseFilm.price,
                status: purchaseFilm.status,
                date: purchaseFilm.date,
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException(" failed to purchase film");
        }
    }
    async getPurchases(user) {
        const query = await this.createQueryBuilder('title');
        query.where("title.userAuthId = :userAuthId", { userAuthId: user.authId });
        const films = await query.getMany();
        try {
            return films;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`failed to retrieve purchases`);
        }
    }
    async _getPurchases() {
        const query = await this.createQueryBuilder('title');
        const films = await query.getMany();
        try {
            return films;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`failed to retrieve purchases`);
        }
    }
    async getFilmPurchaseByUserId(user, userAuthId) {
        if (user.isAdmin !== true) {
            throw new common_1.ConflictException("not allowed");
        }
        let purchaseObject = {};
        const purchases = await this._getPurchases();
        purchases.forEach(purchase => {
            if (purchase.userAuthId === userAuthId) {
                if (!purchaseObject[userAuthId]) {
                    purchaseObject[userAuthId] = [];
                }
                purchaseObject[userAuthId].push(purchase);
            }
        });
        return purchaseObject[userAuthId] ? purchaseObject[userAuthId].length : 0;
    }
};
exports.PurchaseRepository = PurchaseRepository;
exports.PurchaseRepository = PurchaseRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        filmService_1.FilmService])
], PurchaseRepository);
//# sourceMappingURL=purchaseRepository.js.map