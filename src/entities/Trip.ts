import { BaseEntity, Column, Entity, Index, PrimaryColumn } from 'typeorm';
import {
  BikesBoardingType,
  WheelchairBoardingType,
} from 'src/static/utils/enums';

@Entity({ name: 'trips' })
@Index(['agency_id', 'trip_id'])
@Index(['agency_id', 'service_id', 'route_id'])
export class Trip extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 15 })
  agency_id: string;

  @Column({ type: 'varchar', length: 15 })
  route_id: string;

  @PrimaryColumn({ type: 'varchar', length: 50 })
  service_id: string;

  @PrimaryColumn({ type: 'varchar', length: 50 })
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
}
