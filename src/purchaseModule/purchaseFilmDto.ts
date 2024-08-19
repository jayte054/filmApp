import { IsNotEmpty, IsString } from "class-validator";

export class PurchaseFilmDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    film_Id: string;

    @IsString()
    @IsNotEmpty()
    price: string;
}