import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import {
  BikesBoardingType,
  WheelchairBoardingType,
} from 'src/static/utils/enums';
import { Route } from './Route';
import { Time } from './Time';

@Entity({ name: 'trips' })
@Unique(['trip_id', 'agency_id', 'route_id', 'service_id'])
export class Trip extends BaseEntity {
  @PrimaryColumn()
  agency_id: string;

  @PrimaryColumn()
  route_id: string;

  @PrimaryColumn()
  service_id: string;

  @PrimaryColumn()
  trip_id: string;

  @Column()
  trip_headsign: string;

  @Column()
  trip_short_name: string;

  @Column({ nullable: true })
  direction_id: number;

  @Column({ nullable: true })
  block_id: string;

  @Column({ nullable: true })
  shape_id: string;

  @Column({ type: 'enum', enum: WheelchairBoardingType, nullable: true })
  wheelchair_accessible: number;

  @Column({ type: 'enum', enum: BikesBoardingType, nullable: true })
  bikes_allowed: number;

  @ManyToOne(() => Route, (route) => route.trips)
  route: Route;

  @OneToMany(() => Time, (time) => time.trip)
  times: Time[];
}
