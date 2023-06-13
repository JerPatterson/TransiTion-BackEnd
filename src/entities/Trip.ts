import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import {
  BikesBoardingType,
  WheelchairBoardingType,
} from 'src/static/utils/enums';
import { Route } from './Route';
import { Time } from './Time';
import { Shape } from './Shape';
import { Agency } from './Agency';

@Entity({ name: 'trips' })
@Unique(['trip_id', 'agency_id', 'service_id'])
export class Trip extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15 })
  agency_id: string;

  @Column({ type: 'varchar', length: 15 })
  route_id: string;

  @Column({ type: 'varchar', length: 30 })
  service_id: string;

  @Column({ type: 'varchar', length: 50 })
  trip_id: string;

  @Column({ nullable: true })
  trip_headsign: string;

  @Column({ nullable: true })
  trip_short_name: string;

  @Column({ nullable: true })
  direction_id: number;

  @Column({ nullable: true, type: 'varchar', length: 30 })
  block_id: string;

  @Column({ nullable: true, type: 'varchar', length: 30 })
  shape_id: string;

  @Column({ nullable: true, type: 'enum', enum: WheelchairBoardingType })
  wheelchair_accessible: number;

  @Column({ nullable: true, type: 'enum', enum: BikesBoardingType })
  bikes_allowed: number;

  @ManyToOne(() => Agency, (agency) => agency.trips)
  @JoinColumn({ name: 'agency_id', referencedColumnName: 'agency_id' })
  agency: Agency;

  @ManyToOne(() => Route, (route) => route.trips)
  @JoinColumn({ name: 'route_id', referencedColumnName: 'route_id' })
  route: Route;

  @OneToMany(() => Time, (time) => time.trip)
  times: Time[];

  @OneToMany(() => Shape, (shape) => shape.trip)
  shape: Shape[];
}
