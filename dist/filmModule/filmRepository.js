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
exports.FilmRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const filmEntity_1 = require("./filmEntity");
let FilmRepository = class FilmRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(filmEntity_1.FilmEntity, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async createFilm(createFilmDto, user) {
        if (user.isAdmin === false) {
            throw new common_1.InternalServerErrorException(`user ${user.authId} not authorized to create films`);
        }
        const { title, genre, price, description } = createFilmDto;
        const newFilm = new filmEntity_1.FilmEntity();
        newFilm.title = title;
        newFilm.genre = genre;
        newFilm.price = price;
        newFilm.description = description;
        newFilm.date = new Date().toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        newFilm.user = user;
        console.log("hh", newFilm);
        try {
            await newFilm.save();
            return {
                title: newFilm.title,
                genre: newFilm.genre,
                price: newFilm.price,
                description: newFilm.description,
                date: newFilm.date,
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException(`failed to create new film`);
        }
    }
    async getFilm(user) {
        const queryBuilder = await this.createQueryBuilder('title');
        queryBuilder.where("title.userAuthId = :userAuthId", { userAuthId: user.authId });
        const films = await queryBuilder.getMany();
        try {
            return films;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`flms not found`);
        }
    }
    async getFilmWithId(user, filmId) {
        const filmWithId = await this.findOne({
            where: {
                filmId,
                userAuthId: user.authId,
            },
        });
        console.log(filmWithId);
        if (!filmWithId) {
            throw new common_1.NotFoundException(`film with id ${filmId} not found`);
        }
        try {
            return filmWithId;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async getFilmByGenre(user, genre) {
        if (user.isAdmin !== true) {
            throw new common_1.ConflictException('not aloowed');
        }
        let filmObject = {};
        const genreName = genre;
        const query = this.createQueryBuilder('title');
        query.where("title.userAuthId = :userAuthId", { userAuthId: user.authId });
        const films = await query.getMany();
        films.forEach(film => {
            if (film.genre === genre) {
                if (!filmObject[genre]) {
                    filmObject[genre] = [];
                }
                filmObject[genreName].push(film);
            }
        });
        return filmObject;
    }
    async _getFilmWithId(filmId) {
        const filmWithId = await this.findOne({
            where: {
                filmId,
            },
        });
        if (!filmWithId) {
            throw new common_1.NotFoundException(`film with id ${filmId} not found`);
        }
        try {
            return filmWithId;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateFilm(user, filmId, updateFilmDto) {
        const { title, genre, price, description } = updateFilmDto;
        const film = await this.getFilmWithId(user, filmId);
        film.title = title || film.title;
        film.genre = genre || film.genre;
        film.price = price || film.price;
        film.description = description || film.description;
        try {
            await film.save();
            return film;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteFilm(user, filmId) {
        try {
            const film = await this.delete({
                filmId,
                userAuthId: user.authId
            });
            if (!film) {
                throw new common_1.NotFoundException(`film with id ${filmId} not found`);
            }
            return (`film with id ${filmId} successfully deleted`);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("failed to delete film with id ", filmId);
        }
    }
};
exports.FilmRepository = FilmRepository;
exports.FilmRepository = FilmRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], FilmRepository);
//# sourceMappingURL=filmRepository.js.map