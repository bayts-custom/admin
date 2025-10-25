import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FilmEntity } from '../dao/film.entity';

@Injectable()
export class FilmsRepository {
    constructor(
        @InjectRepository(FilmEntity)
        private readonly repository: Repository<FilmEntity>,
    ) {}

    public get(id: string): Promise<FilmEntity | null> {
        return this.repository.findOne({
            where: { id },
            relations: { prices: true },
        });
    }

    public getByName(name: string): Promise<FilmEntity | null> {
        return this.repository.findOne({
            where: { name },
            relations: { prices: true },
            order: {
                prices: {
                    createdAt: 'desc',
                },
            },
        });
    }

    public getList(): Promise<FilmEntity[]> {
        return this.repository.find({
            relations: { prices: true },
            order: {
                prices: {
                    createdAt: 'desc',
                },
            },
        });
    }

    public save(entity: Partial<FilmEntity>): Promise<FilmEntity> {
        return this.repository.save(entity);
    }
}
