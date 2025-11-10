import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    RelationId,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { OrderStatus } from '../enums/order-status.enum';

@Entity('order_logs')
export class OrderLogEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @CreateDateColumn()
    public createdAt: Date;

    @Column({
        type: 'enum',
        enum: OrderStatus,
    })
    public status: OrderStatus;

    @ManyToOne(() => OrderEntity)
    @JoinColumn({
        name: 'order_id',
        referencedColumnName: 'id',
    })
    public order: OrderEntity;

    @RelationId<OrderLogEntity>(({ order }) => order)
    public orderId: string;
}
