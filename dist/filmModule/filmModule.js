"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const authModule_1 = require("../authModule/authModule");
const filmController_1 = require("./filmController");
const filmEntity_1 = require("./filmEntity");
const filmRepository_1 = require("./filmRepository");
const filmService_1 = require("./filmService");
let FilmModule = class FilmModule {
};
exports.FilmModule = FilmModule;
exports.FilmModule = FilmModule = __decorate([
    (0, common_1.Module)({
        imports: [
            authModule_1.AuthModule,
            typeorm_1.TypeOrmModule.forFeature([
                filmEntity_1.FilmEntity
            ]),
        ],
        providers: [filmRepository_1.FilmRepository, filmService_1.FilmService],
        controllers: [filmController_1.FilmController],
        exports: [filmService_1.FilmService]
    })
], FilmModule);
//# sourceMappingURL=filmModule.js.map