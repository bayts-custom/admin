import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsController } from './films.controller';
import { FilmEntity } from './dao/film.entity';
import { FilmsRepository } from './repositories/films.repository';
import { FilmsService } from './services/films.service';
import { FilmPricesRepository } from './repositories/film-prices.repository';
import { FilmPriceEntity } from './dao/film-price.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FilmEntity, FilmPriceEntity])],
    controllers: [FilmsController],
    providers: [FilmsRepository, FilmsService, FilmPricesRepository],
    exports: [FilmsService],
})
export class FilmsModule {}
