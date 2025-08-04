import { BossEntity } from 'src/bosses/dao/boss.entity';
import { CarMarkEntity } from 'src/cars/dao/car-mark.entity';
import { CarModelEntity } from 'src/cars/dao/car-model.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    RelationId,
    UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
export class OrderEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    public description?: string;

    @Column({
        name: 'full_price',
        type: 'int',
        nullable: true,
    })
    public fullPrice?: number;

    @Column({
        type: 'int',
        nullable: true,
    })
    public earn?: number;

    @Column({
        type: 'int',
        nullable: true,
    })
    public expenses?: number;

    @Column({
        name: 'date_from',
        type: 'date',
        nullable: true,
    })
    public dateFrom?: Date;

    @Column({
        name: 'date_to',
        type: 'date',
        nullable: true,
    })
    public dateTo?: Date;

    @ManyToOne(() => BossEntity)
    @JoinColumn({
        name: 'boss_id',
        referencedColumnName: 'id',
    })
    public boss?: BossEntity;

    @RelationId<OrderEntity>(({ boss }) => boss)
    public bossId?: string;

    @ManyToOne(() => CarMarkEntity)
    @JoinColumn({
        name: 'car_mark_id',
        referencedColumnName: 'id',
    })
    public carMark: CarMarkEntity;

    @RelationId<OrderEntity>(({ carMark }) => carMark)
    public carMarkId: string;

    @ManyToOne(() => CarModelEntity)
    @JoinColumn({
        name: 'car_model_id',
        referencedColumnName: 'id',
    })
    public carModel: CarModelEntity;

    @RelationId<OrderEntity>(({ carModel }) => carModel)
    public carModelId: string;
}
