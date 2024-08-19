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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const authEntity_1 = require("../authModule/authEntity");
const getUserDecorator_1 = require("../authModule/getUserDecorator/getUserDecorator");
const PurchaseService_1 = require("./PurchaseService");
let PurchaseController = class PurchaseController {
    constructor(purchaseService) {
        this.purchaseService = purchaseService;
    }
    async purchaseFilm(user, filmId) {
        console.log(filmId);
        return await this.purchaseService.purchaseFilm(user, filmId);
    }
    async getPurchases(user) {
        return await this.purchaseService.getPurchases(user);
    }
    async getFilmPurchaseByUserId(user, userAuthId) {
        return await this.purchaseService.getFilmPurchaseByUserId(user, userAuthId);
    }
};
exports.PurchaseController = PurchaseController;
__decorate([
    (0, common_1.Post)('/purchaseFilm/:filmId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, getUserDecorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('filmId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authEntity_1.AuthEntity, String]),
    __metadata("design:returntype", Promise)
], PurchaseController.prototype, "purchaseFilm", null);
__decorate([
    (0, common_1.Get)('/getPurchases'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, getUserDecorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authEntity_1.AuthEntity]),
    __metadata("design:returntype", Promise)
], PurchaseController.prototype, "getPurchases", null);
__decorate([
    (0, common_1.Get)('/getFilmPurchaseByUserId/:userAuthId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, getUserDecorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('userAuthId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authEntity_1.AuthEntity, String]),
    __metadata("design:returntype", Promise)
], PurchaseController.prototype, "getFilmPurchaseByUserId", null);
exports.PurchaseController = PurchaseController = __decorate([
    (0, common_1.Controller)('purchase'),
    __metadata("design:paramtypes", [PurchaseService_1.PurchaseService])
], PurchaseController);
//# sourceMappingURL=purchaseController.js.map