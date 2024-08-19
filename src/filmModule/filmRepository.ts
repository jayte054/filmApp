import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { FilmEntity } from "./filmEntity";
import { FilmObject } from "./types";
import { CreateFilmDto, UpdateFilmDto } from "./filmDto";
import { AuthEntity } from "src/authModule/authEntity";

@Injectable()
export class FilmRepository extends Repository<FilmEntity> {
    constructor (
        private dataSource: DataSource
    ) { super (FilmEntity, dataSource.createEntityManager())}

    async createFilm(createFilmDto: CreateFilmDto, user: AuthEntity): Promise<FilmObject> {
        if(user.isAdmin === false) {
            throw new InternalServerErrorException(`user ${user.authId} not authorized to create films`)
        }
        const {title, genre, price, description} = createFilmDto

        const newFilm = new FilmEntity();

        newFilm.title = title;
        newFilm.genre = genre;
        newFilm.price = price;
        newFilm.description = description;
        newFilm.date = new Date().toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    });
        newFilm.user = user;
        console.log("hh",newFilm)
        try {
            await newFilm.save()
            return {
                title: newFilm.title,
                genre: newFilm.genre,
                price: newFilm.price,
                description: newFilm.description,
                date: newFilm.date,
            }
        } catch(error) {
            console.log(error)
            throw new InternalServerErrorException(`failed to create new film`)
        }

    }

    async getFilm(user: AuthEntity): Promise<FilmEntity[]> {
        const queryBuilder = await this.createQueryBuilder('title');
        queryBuilder.where("title.userAuthId = :userAuthId", {userAuthId: user.authId})
        
        const films = await queryBuilder.getMany();

        try{
            return films
        } catch (error) {
            throw new InternalServerErrorException(`flms not found`)
        }

    }

    async getFilmWithId(user: AuthEntity, filmId: string,): Promise<FilmEntity> {
         const filmWithId = await this.findOne({
            where: {
                filmId,
                userAuthId: user.authId,
            },
         });
         console.log(filmWithId)
         if(!filmWithId) {
            throw new NotFoundException(`film with id ${filmId} not found`)
         }
         try {
            return filmWithId;
         }catch (error) {
            throw new InternalServerErrorException()
         }
    }


    async getFilmByGenre(user: AuthEntity, genre: string) {

        if (user.isAdmin !== true) {
            throw new ConflictException('not aloowed')
        }
        let filmObject: { [key: string]: any[] } = {};
        const genreName = genre;
    const query = this.createQueryBuilder('title');
    
    query.where("title.userAuthId = :userAuthId", { userAuthId: user.authId });
    
    const films = await query.getMany();
    
    films.forEach(film => {
        if (film.genre === genre) {
            if (!filmObject[genre]) {
                filmObject[genre] = [];
            }
            filmObject[genreName].push(film);
        }
    });
    
    return filmObject;
}

       async _getFilmWithId(filmId: string,): Promise<FilmEntity> {
         const filmWithId = await this.findOne({
            where: {
                filmId,
            },
         });

         if(!filmWithId) {
            throw new NotFoundException(`film with id ${filmId} not found`)
         }
         try {
            return filmWithId;
         }catch (error) {
            throw new InternalServerErrorException()
         }
    }

    async updateFilm(user: AuthEntity, filmId: string, updateFilmDto: UpdateFilmDto): Promise<FilmEntity> {
        const {title, genre, price, description} = updateFilmDto;

        const film = await this.getFilmWithId(user, filmId)

        film.title = title || film.title;
        film.genre = genre || film.genre;
        film.price = price || film.price;
        film.description = description || film.description;

        try {
            await film.save();
            return film;
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }

    async deleteFilm(user: AuthEntity, filmId: string) {
        try{
            const film = await this.delete({
            filmId,
            userAuthId: user.authId
        })
        if(!film) {
            throw new NotFoundException(`film with id ${filmId} not found`)
        }
        return (`film with id ${filmId} successfully deleted`)
        } catch (error) {
            throw new InternalServerErrorException("failed to delete film with id ", filmId)
        }
    }
}