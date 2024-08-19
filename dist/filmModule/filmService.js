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
exports.FilmService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const filmRepository_1 = require("./filmRepository");
let FilmService = class FilmService {
    constructor(filmRepository) {
        this.filmRepository = filmRepository;
    }
    async createFilm(createFilmDto, user) {
        return await this.filmRepository.createFilm(createFilmDto, user);
    }
    async getFilm(user) {
        return await this.filmRepository.getFilm(user);
    }
    async getFilmWithId(user, filmId) {
        return await this.filmRepository.getFilmWithId(user, filmId);
    }
    async getFilmByGenre(user, genre) {
        return await this.filmRepository.getFilmByGenre(user, genre);
    }
    async _getFilmWithId(filmId) {
        return await this.filmRepository._getFilmWithId(filmId);
    }
    async updateFilm(user, filmId, updateFilmDto) {
        return await this.filmRepository.updateFilm(user, filmId, updateFilmDto);
    }
    async deleteFilm(user, filmId) {
        return await this.filmRepository.deleteFilm(user, filmId);
    }
};
exports.FilmService = FilmService;
exports.FilmService = FilmService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(filmRepository_1.FilmRepository)),
    __metadata("design:paramtypes", [filmRepository_1.FilmRepository])
], FilmService);
//# sourceMappingURL=filmService.js.map