import { DataSource, Repository } from "typeorm";
import { FilmEntity } from "./filmEntity";
import { FilmObject } from "./types";
import { CreateFilmDto, UpdateFilmDto } from "./filmDto";
import { AuthEntity } from "src/authModule/authEntity";
export declare class FilmRepository extends Repository<FilmEntity> {
    private dataSource;
    constructor(dataSource: DataSource);
    createFilm(createFilmDto: CreateFilmDto, user: AuthEntity): Promise<FilmObject>;
    getFilm(user: AuthEntity): Promise<FilmEntity[]>;
    _getFilm(): Promise<FilmEntity[]>;
    getFilmWithId(user: AuthEntity, filmId: string): Promise<FilmEntity>;
    getFilmByGenre(user: AuthEntity, genre: string): Promise<{
        [key: string]: any[];
    }>;
    _getFilmWithId(filmId: string): Promise<FilmEntity>;
    updateFilm(user: AuthEntity, filmId: string, updateFilmDto: UpdateFilmDto): Promise<FilmEntity>;
    deleteFilm(user: AuthEntity, filmId: string): Promise<string>;
}
