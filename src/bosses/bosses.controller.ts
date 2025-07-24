import { Body, Controller, Get, Post } from '@nestjs/common';

import { BossesService } from './services/bosses.service';
import { BossEntity } from './dao/boss.entity';
import { SaveBossDto } from './dto/save-boss.dto';

@Controller('bosses')
export class BossesController {
    constructor(private readonly bossesService: BossesService) {}

    @Get()
    public async getList(): Promise<BossEntity[]> {
        return this.bossesService.getList();
    }

    @Post()
    public async save(@Body() data: SaveBossDto): Promise<BossEntity> {
        return this.bossesService.save(data);
    }
}
