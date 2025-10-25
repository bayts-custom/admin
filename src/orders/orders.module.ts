import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderEntity } from './dao/order.entity';
import { OrdersRepository } from './repositories/orders.repository';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './orders.controller';
import { BossesModule } from 'src/bosses/bosses.module';
import { CarsModule } from 'src/cars/cars.module';
import { FilmsModule } from 'src/films/films.module';

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity]), BossesModule, CarsModule, FilmsModule],
    controllers: [OrdersController],
    providers: [OrdersRepository, OrdersService],
})
export class OrdersModule {}
