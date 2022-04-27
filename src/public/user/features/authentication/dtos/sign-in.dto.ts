import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDTO {

    @IsNotEmpty()
    @IsEmail()
    public readonly email: string;

    @IsNotEmpty()
    @IsString()
    public readonly password: string;
}