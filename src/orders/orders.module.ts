import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderEntity } from './dao/order.entity';
import { OrdersRepository } from './repositories/orders.repository';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './orders.controller';
import { BossesModule } from 'src/bosses/bosses.module';

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity]), BossesModule],
    controllers: [OrdersController],
    providers: [OrdersRepository, OrdersService],
})
export class OrdersModule {}
