import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { OrdersService } from './services/orders.service';
import { SaveOrderDto } from './dto/save-order.dto';
import { OrderEntity } from './dao/order.entity';
import { GetOrdersDto } from './dto/get-orders.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}
    @Get()
    public async getList(@Query() query: GetOrdersDto): Promise<OrderEntity[]> {
        return this.ordersService.getList(query);
    }

    @Get(':id')
    public async get(@Param('id') id: string): Promise<OrderEntity> {
        return this.ordersService.get(id);
    }

    @Post()
    public async save(@Body() data: SaveOrderDto): Promise<OrderEntity> {
        return this.ordersService.save(data);
    }
}
