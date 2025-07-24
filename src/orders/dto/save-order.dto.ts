import { Expose } from 'class-transformer';
import { IsDateString, IsDefined, IsNumber, IsOptional, IsString, IsUUID, ValidateIf } from 'class-validator';
import { AsDate } from 'src/_decorators/as-date.transformer';

export class SaveOrderDto {
    @Expose()
    @IsOptional()
    @IsUUID()
    public id?: string;

    @Expose()
    @IsOptional()
    @IsUUID()
    public bossId?: string;

    @Expose()
    @IsOptional()
    @IsString()
    public bossName?: string;

    @Expose()
    @IsString()
    public car: string;

    @Expose()
    @IsOptional()
    @IsString()
    public description?: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    public fullPrice?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    public earn?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    public expenses?: number;

    @Expose()
    @IsOptional()
    @AsDate()
    @IsDateString()
    public dateFrom?: string;

    @Expose()
    @IsOptional()
    @AsDate()
    @IsDateString()
    public dateTo?: string;

    @ValidateIf((obj: SaveOrderDto) => (!obj.bossId && !obj.bossName) || (!!obj.bossId && !!obj.bossName))
    @IsDefined({ message: 'Boss is invalid' })
    public bossValidaton?: undefined;
}
