import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Trip } from './Trip';
import { Agency } from './Agency';

@Entity({ name: 'shapes' })
@Unique(['shape_id', 'agency_id', 'shape_pt_sequence'])
export class Shape extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15 })
  agency_id: string;

  @Column({ type: 'varchar', length: 30 })
  shape_id: string;

  @Column({ type: 'float' })
  shape_pt_lat: number;

  @Column({ type: 'float' })
  shape_pt_lon: number;

  @Column({ type: 'int' })
  shape_pt_sequence: number;

  @Column({ nullable: true, type: 'float' })
  shape_dist_traveled: number;

  @ManyToOne(() => Agency, (agency) => agency.shapes)
  @JoinColumn({ name: 'agency_id', referencedColumnName: 'agency_id' })
  agency: Agency;

  @ManyToOne(() => Trip, (trip) => trip.times)
  trip: Trip;
}
