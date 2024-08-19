import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthEntity } from "src/authModule/authEntity";
import { CreateFilmDto, UpdateFilmDto } from "./filmDto";
import { FilmEntity } from "./filmEntity";
import { FilmRepository } from "./filmRepository";
import { FilmObject } from "./types";

@Injectable()
export class FilmService {
    constructor(@InjectRepository(FilmRepository)
    private filmRepository: FilmRepository
    ) {}

    async createFilm(createFilmDto: CreateFilmDto, user: AuthEntity): Promise<FilmObject> {
        return await this.filmRepository.createFilm(createFilmDto, user)
    }

    async getFilm(user: AuthEntity): Promise<FilmEntity[]> {
        return await this.filmRepository.getFilm(user);
    }

     async getFilmWithId(user: AuthEntity, filmId: string): Promise<FilmEntity> {
        return await this.filmRepository.getFilmWithId(user, filmId);
    }

    async getFilmByGenre(user: AuthEntity, genre: string) {
        return await this.filmRepository.getFilmByGenre(user, genre);
    }

         async _getFilmWithId( filmId: string): Promise<FilmEntity> {
        return await this.filmRepository._getFilmWithId( filmId);
    }

    async updateFilm(user:AuthEntity, filmId: string, updateFilmDto: UpdateFilmDto): Promise<FilmEntity> {
        return await this.filmRepository.updateFilm(
            user,
            filmId,
            updateFilmDto
        )
    }

    async deleteFilm(user: AuthEntity, filmId: string) {
        return await this.filmRepository.deleteFilm(user, filmId)
    }

}