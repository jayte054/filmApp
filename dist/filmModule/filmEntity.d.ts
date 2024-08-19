import { AuthEntity } from "src/authModule/authEntity";
import { BaseEntity } from "typeorm";
import { FilmGenre } from "./types";
export declare class FilmEntity extends BaseEntity {
    filmId: string;
    title: string;
    genre: FilmGenre;
    price: string;
    description: string;
    date: string;
    user: AuthEntity;
    userAuthId: String;
}
