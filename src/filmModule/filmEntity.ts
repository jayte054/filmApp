import { AuthEntity } from "src/authModule/authEntity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FilmGenre } from "./types";

@Entity()
export class FilmEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    filmId: string;

    @Column()
    title: string;

    @Column()
    genre: FilmGenre;

    @Column()
    price: string;

    @Column()
    description: string;

    @Column()
    date: string;

    @ManyToOne(() => AuthEntity, (user) => user.authId, { eager: false })
    user: AuthEntity;

    @Column()
    userAuthId: String;
}