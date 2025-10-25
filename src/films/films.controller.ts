import { Body, Controller, Get, Post } from '@nestjs/common';

import { FilmsService } from './services/films.service';
import { FilmEntity } from './dao/film.entity';
import { SaveFilmDto } from './dto/save-film.dto';

@Controller('films')
export class FilmsController {
    constructor(private readonly filmsService: FilmsService) {}

    @Get()
    public async getList(): Promise<FilmEntity[]> {
        return this.filmsService.getList();
    }

    @Post()
    public async save(@Body() data: SaveFilmDto): Promise<FilmEntity> {
        return this.filmsService.save(data);
    }
}
