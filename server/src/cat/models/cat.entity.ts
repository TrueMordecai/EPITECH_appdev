import { IsEnum } from "class-validator";
import { User } from "src/user/models/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

export enum CatType {
    Cat = "cat"
  }

@Entity('cat')
export class Cat {

    @PrimaryGeneratedColumn()
    id : number;
        
    @Column()
    title : string;

    @Column()
    refresh : number

    @ManyToOne(() => User)
    @JoinColumn({name : 'league_id'})
    user: User;

    @IsEnum(CatType)
    @Column()
    type :  CatType
}