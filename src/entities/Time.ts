import { BaseEntity, Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { DropOffType, PickupType, TimePointType } from 'src/static/utils/enums';

@Entity({ name: 'times' })
@Index(['agency_id', 'trip_id'])
@Index(['agency_id', 'stop_id'])
export class Time extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 15 })
  agency_id: string;

  @PrimaryColumn({ type: 'varchar', length: 50 })
  trip_id: string;

  @Column({ type: 'varchar', length: 10 })
  arrival_time: string;

  @PrimaryColumn({ type: 'varchar', length: 10 })
  departure_time: string;

  @PrimaryColumn({ type: 'varchar', length: 30 })
  stop_id: string;

  @Column({ type: 'int' })
  stop_sequence: number;

  @Column({ nullable: true })
  stop_headsign: string;

  @Column({ nullable: true, type: 'enum', enum: PickupType })
  pickup_type: number;

  @Column({ nullable: true, type: 'enum', enum: DropOffType })
  drop_off_type: number;

  @Column({ nullable: true, type: 'enum', enum: PickupType })
  continuous_pickup: number;

  @Column({ nullable: true, type: 'enum', enum: DropOffType })
  continuous_drop_off: number;

  @Column({ nullable: true, type: 'float' })
  shape_dist_traveled: number;

  @Column({ nullable: true, type: 'enum', enum: TimePointType })
  timepoint: number;
}
