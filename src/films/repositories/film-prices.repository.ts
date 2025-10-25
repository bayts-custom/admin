import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FilmPriceEntity } from '../dao/film-price.entity';

@Injectable()
export class FilmPricesRepository {
    constructor(
        @InjectRepository(FilmPriceEntity)
        private readonly repository: Repository<FilmPriceEntity>,
    ) {}

    public get(id: string): Promise<FilmPriceEntity | null> {
        return this.repository.findOne({
            where: { id },
        });
    }

    public getByFilm(filmId: string): Promise<FilmPriceEntity[]> {
        return this.repository.find({
            where: {
                film: {
                    id: filmId,
                },
            },
            order: {
                createdAt: 'DESC',
            },
        });
    }

    public getList(): Promise<FilmPriceEntity[]> {
        return this.repository.find({
            order: {
                createdAt: 'DESC',
            },
        });
    }

    public save(entity: Partial<FilmPriceEntity>): Promise<FilmPriceEntity> {
        return this.repository.save(entity);
    }
}
