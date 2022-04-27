import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignUpDTO {

    @IsNotEmpty()
    @IsString()
    public readonly username: string;

    @IsNotEmpty()
    @IsEmail()
    public readonly email: string;

    @IsNotEmpty()
    @IsString()
    public readonly password: string;

    @IsNotEmpty()
    @IsString()
    public readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    public readonly lastName: string;
}