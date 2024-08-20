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
exports.FilmController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const authEntity_1 = require("../authModule/authEntity");
const getUserDecorator_1 = require("../authModule/getUserDecorator/getUserDecorator");
const filmDto_1 = require("./filmDto");
const filmService_1 = require("./filmService");
let FilmController = class FilmController {
    constructor(filmService) {
        this.filmService = filmService;
    }
    async createFilm(createFilmDto, user) {
        return await this.filmService.createFilm(createFilmDto, user);
    }
    async getFilms(user) {
        return await this.filmService.getFilm(user);
    }
    async _getFilms() {
        return await this.filmService._getFilm();
    }
    async getFilmByGenre(user, genre) {
        return await this.filmService.getFilmByGenre(user, genre);
    }
    async getFilmWithId(user, filmId) {
        return await this.filmService.getFilmWithId(user, filmId);
    }
    async updateFilm(user, filmId, updateFilmDto) {
        return await this.filmService.updateFilm(user, filmId, updateFilmDto);
    }
    async deleteFilm(user, filmId) {
        return await this.filmService.deleteFilm(user, filmId);
    }
};
exports.FilmController = FilmController;
__decorate([
    (0, common_1.Post)('/createFilm'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, getUserDecorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filmDto_1.CreateFilmDto,
        authEntity_1.AuthEntity]),
    __metadata("design:returntype", Promise)
], FilmController.prototype, "createFilm", null);
__decorate([
    (0, common_1.Get)('/getFilm'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, getUserDecorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authEntity_1.AuthEntity]),
    __metadata("design:returntype", Promise)
], FilmController.prototype, "getFilms", null);
__decorate([
    (0, common_1.Get)('/_getFilm'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FilmController.prototype, "_getFilms", null);
__decorate([
    (0, common_1.Get)('/getFilmByGenre/:genre'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, getUserDecorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('genre')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authEntity_1.AuthEntity, String]),
    __metadata("design:returntype", Promise)
], FilmController.prototype, "getFilmByGenre", null);
__decorate([
    (0, common_1.Get)('/getFilmWithId/'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, getUserDecorator_1.GetUser)()),
    __param(1, (0, common_1.Param)("filmId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authEntity_1.AuthEntity, String]),
    __metadata("design:returntype", Promise)
], FilmController.prototype, "getFilmWithId", null);
__decorate([
    (0, common_1.Patch)("/updateFilm/:filmId"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, getUserDecorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('filmId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authEntity_1.AuthEntity, String, filmDto_1.UpdateFilmDto]),
    __metadata("design:returntype", Promise)
], FilmController.prototype, "updateFilm", null);
__decorate([
    (0, common_1.Delete)("/deleteFilm/:filmId"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, getUserDecorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('filmId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authEntity_1.AuthEntity, String]),
    __metadata("design:returntype", Promise)
], FilmController.prototype, "deleteFilm", null);
exports.FilmController = FilmController = __decorate([
    (0, common_1.Controller)('film'),
    __metadata("design:paramtypes", [filmService_1.FilmService])
], FilmController);
//# sourceMappingURL=filmController.js.map