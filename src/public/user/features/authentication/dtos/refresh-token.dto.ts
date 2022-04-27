import { IsNotEmpty, IsString } from "class-validator";

export class RefreshTokenDTO {
    @IsNotEmpty()
    @IsString()
    public readonly userId: string;

    @IsNotEmpty()
    @IsString()
    public readonly refreshToken: string;
}