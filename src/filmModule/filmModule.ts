import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthEntity } from "src/authModule/authEntity";
import { AuthModule } from "src/authModule/authModule";
import { FilmController } from "./filmController";
import { FilmEntity } from "./filmEntity";
import { FilmRepository } from "./filmRepository";
import { FilmService } from "./filmService";

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([
            FilmEntity
    ]),
    ],
    providers: [FilmRepository, FilmService],
    controllers: [FilmController],
    exports: [FilmService]
})

export class FilmModule {}