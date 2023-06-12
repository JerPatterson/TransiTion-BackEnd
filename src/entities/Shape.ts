import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { Trip } from './Trip';

@Entity({ name: 'shapes' })
@Unique(['shape_id', 'agency_id', 'shape_pt_sequence'])
export class Shape extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 30 })
  agency_id: string;

  @PrimaryColumn({ type: 'varchar', length: 30 })
  shape_id: string;

  @Column({ type: 'float' })
  shape_pt_lat: number;

  @Column({ type: 'float' })
  shape_pt_lon: number;

  @PrimaryColumn({ type: 'int' })
  shape_pt_sequence: number;

  @Column({ type: 'float', nullable: true })
  shape_dist_traveled: number;

  @ManyToOne(() => Trip, (trip) => trip.times)
  trip: Trip;
}
