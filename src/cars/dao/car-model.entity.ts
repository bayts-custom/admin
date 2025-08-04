import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { CarMarkEntity } from './car-mark.entity';

@Entity('car_model')
export class CarModelEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ type: 'varchar' })
    public name: string;

    @Column({ type: 'varchar', name: 'rus_name' })
    public rusName: string;

    @Column({ type: 'varchar' })
    public class: string;

    @Column({
        name: 'year_from',
        type: 'int',
        nullable: true,
    })
    public yearFrom?: number;

    @Column({
        name: 'year_to',
        type: 'int',
        nullable: true,
    })
    public yearTo?: number;

    @ManyToOne(() => CarMarkEntity)
    @JoinColumn({
        name: 'mark_id',
        referencedColumnName: 'id',
    })
    public mark: CarMarkEntity;

    @RelationId<CarModelEntity>(({ mark }) => mark)
    public markId: string;
}
