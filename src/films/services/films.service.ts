import { Injectable, NotFoundException } from '@nestjs/common';

import { FilmEntity } from '../dao/film.entity';
import { FilmsRepository } from '../repositories/films.repository';
import { SaveFilmDto } from '../dto/save-film.dto';
import { FilmPricesRepository } from '../repositories/film-prices.repository';

@Injectable()
export class FilmsService {
    constructor(
        private readonly filmsRepository: FilmsRepository,
        private readonly filmPricesRepository: FilmPricesRepository,
    ) {}

    public async get(id: string): Promise<FilmEntity> {
        const film = await this.filmsRepository.get(id);

        if (!film) {
            throw new NotFoundException('Film not found.');
        }

        return film;
    }

    public async getByName(name: string): Promise<FilmEntity | null> {
        return this.filmsRepository.getByName(name);
    }

    public async getList(): Promise<FilmEntity[]> {
        return this.filmsRepository.getList();
    }

    public async save(body: SaveFilmDto): Promise<FilmEntity> {
        const { currentPrice, ...data } = body;

        const updatedFilm = await this.filmsRepository.save(data);

        if (currentPrice) {
            await this.filmPricesRepository.save({
                filmId: updatedFilm.id,
                amount: BigInt(currentPrice),
            });
        }

        return this.get(updatedFilm.id);
    }
}
