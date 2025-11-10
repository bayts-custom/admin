import { Injectable, NotFoundException } from '@nestjs/common';

import { OrderEntity } from '../dao/order.entity';
import { OrderFilter, OrdersRepository } from '../repositories/orders.repository';
import { SaveOrderDto } from '../dto/save-order.dto';
import { BossesService } from 'src/bosses/services/bosses.service';
import { CarsService } from 'src/cars/services/cars.service';
import { FilmsService } from 'src/films/services/films.service';
import { OrderLogsRepository } from '../repositories/order-logs.repository';
import { GetOrdersDto } from '../dto/get-orders.dto';

@Injectable()
export class OrdersService {
    constructor(
        private readonly ordersRepository: OrdersRepository,
        private readonly bossesService: BossesService,
        private readonly carsService: CarsService,
        private readonly filmsService: FilmsService,
        private readonly orderLogsRepository: OrderLogsRepository,
    ) {}

    public async get(id: string): Promise<OrderEntity> {
        const order = await this.ordersRepository.get(id);

        if (!order) {
            throw new NotFoundException('Order not found.');
        }

        return order;
    }

    public async getList(query: GetOrdersDto): Promise<OrderEntity[]> {
        const filter: OrderFilter = {
            ...query,
            dateFrom: query.dateFrom ? new Date(query.dateFrom) : undefined,
            dateTo: query.dateTo ? new Date(query.dateTo) : undefined,
        };

        return this.ordersRepository.getList(filter);
    }

    public async save(body: SaveOrderDto): Promise<OrderEntity> {
        const { bossId, carMarkId, carModelId, filmId, ...data } = body;

        const [boss, mark, model, film] = await Promise.all([
            bossId ? this.bossesService.get(bossId) : null,
            this.carsService.getMark(carMarkId),
            this.carsService.getModel(carModelId),
            filmId ? this.filmsService.get(filmId) : null,
        ]);

        const saved = await this.ordersRepository.save({
            ...data,
            dateFrom: data.dateFrom ? new Date(data.dateFrom) : undefined,
            dateTo: data.dateTo ? new Date(data.dateTo) : undefined,
            boss: {
                id: boss?.id,
            },
            carMark: {
                id: mark.id,
            },
            carModel: {
                id: model.id,
            },
            film: {
                id: film?.id,
            },
        });

        if (body.status) {
            await this.orderLogsRepository.save({
                order: {
                    id: saved.id,
                },
                status: body.status,
            });
        }

        return this.get(saved.id);
    }
}
