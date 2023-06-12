import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import {
  DropOffType,
  PickupType,
  RouteType,
  WheelchairBoardingType,
} from 'src/static/utils/enums';
import { Trip } from './Trip';

@Entity({ name: 'routes' })
@Unique(['route_id', 'agency_id'])
export class Route extends BaseEntity {
  @PrimaryColumn()
  route_id: string;

  @PrimaryColumn()
  agency_id: string;

  @Column()
  route_short_name: string;

  @Column()
  route_long_name: string;

  @Column({ nullable: true })
  route_desc: string;

  @Column({ type: 'enum', enum: RouteType })
  route_type: number;

  @Column({ nullable: true })
  route_url: string;

  @Column({ nullable: true })
  route_color: string;

  @Column({ nullable: true })
  route_text_color: string;

  @Column({ type: 'int', nullable: true })
  route_sort_order: number;

  @Column({ type: 'enum', enum: PickupType, nullable: true })
  continuous_pickup: string;

  @Column({ type: 'enum', enum: DropOffType, nullable: true })
  continuous_drop_off: string;

  @Column({ type: 'enum', enum: WheelchairBoardingType, nullable: true })
  wheelchair_boarding: number;

  @OneToMany(() => Trip, (trip) => trip.route)
  trips: Trip[];
}
