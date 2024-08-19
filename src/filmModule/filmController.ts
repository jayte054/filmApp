import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { AuthEntity } from "src/authModule/authEntity";
import { GetUser } from "src/authModule/getUserDecorator/getUserDecorator";
import { CreateFilmDto, UpdateFilmDto } from "./filmDto";
import { FilmEntity } from "./filmEntity";
import { FilmService } from "./filmService";
import { FilmObject } from "./types";

@Controller('film')
export class FilmController {
    constructor(private readonly filmService: FilmService){}

    @Post('/createFilm')
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    async createFilm(
        @Body() createFilmDto: CreateFilmDto,
        @GetUser() user: AuthEntity
    ): Promise<FilmObject> {
        return await this.filmService.createFilm(createFilmDto, user);
    }

    @Get('/getFilm')
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    async getFilms(@GetUser() user: AuthEntity): Promise<FilmEntity[]> {
        return await this.filmService.getFilm(user)
    }

    @Get('/getFilmByGenre/:genre')
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    async getFilmByGenre (@GetUser() user: AuthEntity, @Param('genre') genre: string) {
        return await this.filmService.getFilmByGenre(user, genre)
    }

    @Get('/getFilmWithId/')
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    async getFilmWithId(@GetUser() user: AuthEntity, @Param("filmId") filmId: string): Promise<FilmEntity> {
        return await this.filmService.getFilmWithId(user, filmId)
    }

    @Patch("/updateFilm/:filmId")
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    async updateFilm(
        @GetUser() user: AuthEntity,
        @Param('filmId') filmId: string,
        @Body() updateFilmDto: UpdateFilmDto
    ): Promise<FilmEntity> {
        return await this.filmService.updateFilm(user, filmId, updateFilmDto)
    }

    @Delete("/deleteFilm/:filmId")
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    async deleteFilm(
        @GetUser() user: AuthEntity,
        @Param('filmId') filmId: string
    ) {
        return await this.filmService.deleteFilm(user, filmId)
    }
}