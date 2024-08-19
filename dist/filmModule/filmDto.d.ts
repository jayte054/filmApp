import { FilmGenre } from "./types";
export declare class CreateFilmDto {
    title: string;
    genre: FilmGenre;
    price: string;
    description: string;
}
export declare class UpdateFilmDto {
    title?: string;
    genre?: FilmGenre;
    price?: string;
    description?: string;
}
