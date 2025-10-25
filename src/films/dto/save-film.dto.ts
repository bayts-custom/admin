import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class SaveFilmDto {
    @Expose()
    @IsOptional()
    @IsUUID()
    public id?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public name?: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    public currentPrice?: number;
}
