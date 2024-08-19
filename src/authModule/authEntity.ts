import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { FilmEntity } from "src/filmModule/filmEntity";
import { PurchaseEntity } from "src/purchaseModule/purchaseEntity";

@Entity()
export class AuthEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    authId: string;

    @Column()
    fullName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column()
    isAdmin: boolean

    @OneToMany(() => FilmEntity, (filmId) => filmId.user, {
    eager: true,
    })
    filmId: FilmEntity;

    @OneToMany(() => PurchaseEntity, (purchaseId) => purchaseId.user, {
    eager: true,
    })
    purchaseId: PurchaseEntity;

    async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}