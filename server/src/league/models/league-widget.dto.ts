import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";
import { LeagueType } from "./league.entity";


export class LeagueWidgetDto {
    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    username: string;
    
    @IsNotEmpty()
    type : LeagueType 
    
    @IsNotEmpty()
    refresh : number
}