import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CarModelEntity } from './car-model.entity';

@Entity('car_mark')
export class CarMarkEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ type: 'varchar' })
    public name: string;

    @Column({
        name: 'rus_name',
        type: 'varchar',
    })
    public rusName: string;

    @Column({ type: 'varchar' })
    public country: string;

    @Column({ type: 'boolean' })
    public popular: boolean;

    @OneToMany(() => CarModelEntity, (milestone) => milestone.mark)
    public models: CarModelEntity[];
}
