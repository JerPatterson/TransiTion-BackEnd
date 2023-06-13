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
  DropOffType,
  PickupType,
  RouteType,
  WheelchairBoardingType,
} from 'src/static/utils/enums';
import { Trip } from './Trip';
import { Agency } from './Agency';

@Entity({ name: 'routes' })
@Unique(['route_id', 'agency_id'])
export class Route extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15 })
  route_id: string;

  @Column({ type: 'varchar', length: 15 })
  agency_id: string;

  @Column({ type: 'varchar', length: 25 })
  route_short_name: string;

  @Column()
  route_long_name: string;

  @Column({ nullable: true })
  route_desc: string;

  @Column({ type: 'enum', enum: RouteType })
  route_type: number;

  @Column({ nullable: true })
  route_url: string;

  @Column({ nullable: true, type: 'varchar', length: 10 })
  route_color: string;

  @Column({ nullable: true, type: 'varchar', length: 10 })
  route_text_color: string;

  @Column({ nullable: true, type: 'int' })
  route_sort_order: number;

  @Column({ nullable: true, type: 'enum', enum: PickupType })
  continuous_pickup: number;

  @Column({ nullable: true, type: 'enum', enum: DropOffType })
  continuous_drop_off: number;

  @Column({ nullable: true, type: 'enum', enum: WheelchairBoardingType })
  wheelchair_boarding: number;

  @ManyToOne(() => Agency, (agency) => agency.routes)
  @JoinColumn({ name: 'agency_id', referencedColumnName: 'agency_id' })
  agency: Agency;

  @OneToMany(() => Trip, (trip) => trip.route)
  trips: Trip[];
}
