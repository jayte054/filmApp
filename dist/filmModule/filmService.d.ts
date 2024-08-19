import { AuthEntity } from "src/authModule/authEntity";
import { CreateFilmDto, UpdateFilmDto } from "./filmDto";
import { FilmEntity } from "./filmEntity";
import { FilmRepository } from "./filmRepository";
import { FilmObject } from "./types";
export declare class FilmService {
    private filmRepository;
    constructor(filmRepository: FilmRepository);
    createFilm(createFilmDto: CreateFilmDto, user: AuthEntity): Promise<FilmObject>;
    getFilm(user: AuthEntity): Promise<FilmEntity[]>;
    getFilmWithId(user: AuthEntity, filmId: string): Promise<FilmEntity>;
    getFilmByGenre(user: AuthEntity, genre: string): Promise<{
        [key: string]: any[];
    }>;
    _getFilmWithId(filmId: string): Promise<FilmEntity>;
    updateFilm(user: AuthEntity, filmId: string, updateFilmDto: UpdateFilmDto): Promise<FilmEntity>;
    deleteFilm(user: AuthEntity, filmId: string): Promise<string>;
}
