import { OrderEntity } from 'src/orders/dao/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bosses')
export class BossEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ type: 'varchar' })
    public name: string;

    @OneToMany(() => OrderEntity, (milestone) => milestone.boss)
    public orders: OrderEntity[];
}
