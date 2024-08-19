import { AuthEntity } from "src/authModule/authEntity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaidStatus } from "./types";

@Entity()
export class PurchaseEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    purchaseId: string;

    @Column()
    title: string;

    @Column()
    film_Id: string;

    @Column()
    price: string;

    @Column()
    status: PaidStatus;

    @Column()
    date: string;

    @ManyToOne(() => AuthEntity, (user) => user.authId, {eager: false})
    user: AuthEntity;

    @Column()
    userAuthId: string
}