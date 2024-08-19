import { IsNotEmpty, IsString } from "class-validator";
import { FilmGenre } from "./types";

export class CreateFilmDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    genre: FilmGenre;

    @IsString()
    @IsNotEmpty()
    price: string;

    @IsString()
    @IsNotEmpty()
    description: string
}

export class UpdateFilmDto {
    title?: string;
    genre?: FilmGenre;
    price?: string;
    description?: string
}