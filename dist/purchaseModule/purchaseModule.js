"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const authModule_1 = require("../authModule/authModule");
const filmModule_1 = require("../filmModule/filmModule");
const purchaseController_1 = require("./purchaseController");
const purchaseEntity_1 = require("./purchaseEntity");
const purchaseRepository_1 = require("./purchaseRepository");
const PurchaseService_1 = require("./PurchaseService");
let PurchaseModule = class PurchaseModule {
};
exports.PurchaseModule = PurchaseModule;
exports.PurchaseModule = PurchaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            authModule_1.AuthModule,
            typeorm_1.TypeOrmModule.forFeature([
                purchaseEntity_1.PurchaseEntity,
            ]),
            filmModule_1.FilmModule
        ],
        providers: [purchaseEntity_1.PurchaseEntity, purchaseRepository_1.PurchaseRepository, PurchaseService_1.PurchaseService],
        controllers: [purchaseController_1.PurchaseController]
    })
], PurchaseModule);
//# sourceMappingURL=purchaseModule.js.map