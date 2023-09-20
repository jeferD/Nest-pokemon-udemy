import { IsString, MinLength, IsInt, IsPositive } from "class-validator";


export class CreatePokemonDto {
    @IsInt()
    @IsPositive()
    no: number;

    @IsString()
    @MinLength(1)
    name: string;
}
