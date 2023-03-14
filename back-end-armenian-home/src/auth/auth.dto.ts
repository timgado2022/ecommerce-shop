import { IsEmail } from "class-validator";
import { IsString, MinLength } from "class-validator";
// class-validator - это библиотека, которая позволяет навешивать декораторы внутри класса для валидации
export class AuthDto {
    // если хотите, чтобы это поле было необязательным, то нужно сюда добавить библиотеку IsOptional
    @IsEmail()
    email: string;

    @MinLength(6, {
        message: "Password must be at least 6 characters long",
    })
    @IsString()
    password: string;
   
}