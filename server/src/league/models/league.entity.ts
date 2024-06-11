import { IsEnum } from "class-validator";
import { User } from "src/user/models/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

export enum LeagueType {
    Winrate = "winrate",
    Rankone = "rank"
  }

@Entity('league')
export class League {

    @PrimaryGeneratedColumn()
    id : number;
        
    @Column()
    title : string;

    @Column()
    username: string;

    @ManyToOne(() => User)
    @JoinColumn({name : 'league_id'})
    user: User;

    @IsEnum(LeagueType)
    @Column()
    type :  LeagueType

    @Column()
    refresh : number
}