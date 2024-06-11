import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";
import { CatType } from "./cat.entity";


export class CatWidgetDto {
    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    type : CatType 

    @IsNotEmpty()
    refresh : number 

}