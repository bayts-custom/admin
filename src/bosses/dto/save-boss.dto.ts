import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class SaveBossDto {
    @Expose()
    @IsOptional()
    @IsUUID()
    public id?: string;

    @Expose()
    @IsString()
    public name: string;
}
