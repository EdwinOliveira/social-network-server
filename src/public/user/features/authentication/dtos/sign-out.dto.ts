import { IsNotEmpty, IsString } from "class-validator";

export class SignOutDTO {
    @IsNotEmpty()
    @IsString()
    public readonly userId: string;
}