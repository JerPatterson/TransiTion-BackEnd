import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import {
  DropOffType,
  NightRouteType,
  PickupType,
  RouteType,
  WheelchairBoardingType,
} from 'src/static/utils/enums';

@Entity({ name: 'routes' })
export class Route extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 15 })
  agency_id: string;

  @PrimaryColumn({ type: 'varchar', length: 15 })
  route_id: string;

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

  @Column({ nullable: true, type: 'enum', enum: NightRouteType })
  night_only: NightRouteType;

  @Column({ type: 'json' })
  stop_ids: string[];
}
