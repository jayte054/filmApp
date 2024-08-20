import { AuthEntity } from "src/authModule/authEntity";
import { CreateFilmDto, UpdateFilmDto } from "./filmDto";
import { FilmEntity } from "./filmEntity";
import { FilmService } from "./filmService";
import { FilmObject } from "./types";
export declare class FilmController {
    private readonly filmService;
    constructor(filmService: FilmService);
    createFilm(createFilmDto: CreateFilmDto, user: AuthEntity): Promise<FilmObject>;
    getFilms(user: AuthEntity): Promise<FilmEntity[]>;
    _getFilms(): Promise<FilmEntity[]>;
    getFilmByGenre(user: AuthEntity, genre: string): Promise<{
        [key: string]: any[];
    }>;
    getFilmWithId(user: AuthEntity, filmId: string): Promise<FilmEntity>;
    updateFilm(user: AuthEntity, filmId: string, updateFilmDto: UpdateFilmDto): Promise<FilmEntity>;
    deleteFilm(user: AuthEntity, filmId: string): Promise<string>;
}
