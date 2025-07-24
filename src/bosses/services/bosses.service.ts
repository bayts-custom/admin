import { Injectable, NotFoundException } from '@nestjs/common';

import { BossEntity } from '../dao/boss.entity';
import { BossesRepository } from '../repositories/bosses.repository';
import { SaveBossDto } from '../dto/save-boss.dto';

@Injectable()
export class BossesService {
    constructor(private readonly bossesRepository: BossesRepository) {}

    public async get(id: string): Promise<BossEntity> {
        const pet = await this.bossesRepository.get(id);

        if (!pet) {
            throw new NotFoundException('Boss not found.');
        }

        return pet;
    }

    public async getList(): Promise<BossEntity[]> {
        return this.bossesRepository.getList();
    }

    public async save(body: SaveBossDto): Promise<BossEntity> {
        return this.bossesRepository.save(body);
    }
}
