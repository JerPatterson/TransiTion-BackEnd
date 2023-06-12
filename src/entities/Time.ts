import { BaseEntity, Column, Entity, PrimaryColumn, Unique } from 'typeorm';
import { DropOffType, PickupType, TimePointType } from 'src/static/utils/enums';

@Entity({ name: 'times' })
@Unique(['trip_id', 'agency_id'])
export class Time extends BaseEntity {
  @PrimaryColumn()
  agency_id: string;

  @PrimaryColumn()
  trip_id: string;

  @Column()
  arrival_time: string;

  @Column()
  departure_time: string;

  @Column()
  stop_id: string;

  @Column()
  stop_sequence: number;

  @Column({ nullable: true })
  stop_headsign: string;

  @Column({ type: 'enum', enum: PickupType, nullable: true })
  pickup_type: number;

  @Column({ type: 'enum', enum: DropOffType, nullable: true })
  drop_off_type: number;

  @Column({ type: 'enum', enum: PickupType, nullable: true })
  continuous_pickup: number;

  @Column({ type: 'enum', enum: DropOffType, nullable: true })
  continuous_drop_off: number;

  @Column({ type: 'float', nullable: true })
  shape_dist_traveled: number;

  @Column({ type: 'enum', enum: TimePointType, nullable: true })
  timepoint: number;
}
