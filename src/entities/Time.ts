import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { DropOffType, PickupType, TimePointType } from 'src/static/utils/enums';
import { Trip } from './Trip';
import { Stop } from './Stop';
import { Agency } from './Agency';

@Entity({ name: 'times' })
@Unique(['trip_id', 'agency_id', 'stop_id'])
export class Time extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15 })
  agency_id: string;

  @Column({ type: 'varchar', length: 50 })
  trip_id: string;

  @Column({ type: 'varchar', length: 10 })
  arrival_time: string;

  @Column({ type: 'varchar', length: 10 })
  departure_time: string;

  @Column({ type: 'varchar', length: 30 })
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

  @ManyToOne(() => Agency, (agency) => agency.times)
  @JoinColumn({ name: 'agency_id', referencedColumnName: 'agency_id' })
  agency: Agency;

  @ManyToOne(() => Trip, (trip) => trip.times)
  @JoinColumn({ name: 'trip_id', referencedColumnName: 'trip_id' })
  trip: Trip;

  @ManyToOne(() => Stop, (stop) => stop.times)
  @JoinColumn({ name: 'stop_id', referencedColumnName: 'stop_id' })
  stop: Stop;
}
