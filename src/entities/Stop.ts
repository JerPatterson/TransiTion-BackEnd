import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { LocationType, WheelchairBoardingType } from 'src/static/utils/enums';
import { Time } from './Time';

@Entity({ name: 'stops' })
@Unique(['stop_id', 'agency_id'])
export class Stop extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 30 })
  agency_id: string;

  @PrimaryColumn({ type: 'varchar', length: 30 })
  stop_id: string;

  @Column({ nullable: true, type: 'varchar', length: 30 })
  stop_code: string;

  @Column()
  stop_name: string;

  @Column({ nullable: true })
  stop_desc: string;

  @Column({ type: 'float' })
  stop_lat: number;

  @Column({ type: 'float' })
  stop_lon: number;

  @Column({ nullable: true, type: 'varchar', length: 30 })
  zone_id: string;

  @Column({ nullable: true })
  stop_url: string;

  @Column({ type: 'enum', enum: LocationType })
  location_type: number;

  @Column({ nullable: true, type: 'varchar', length: 30 })
  parent_station: string;

  @Column({ nullable: true })
  stop_timezone: string;

  @Column({ nullable: true, type: 'enum', enum: WheelchairBoardingType })
  wheelchair_boarding: number;

  @Column({ nullable: true, type: 'varchar', length: 30 })
  level_id: string;

  @Column({ nullable: true, type: 'varchar', length: 30 })
  platform_code: string;

  @Column({ nullable: true })
  stop_shelter: boolean;

  @Column({ nullable: true })
  stop_display: boolean;

  @OneToMany(() => Time, (time) => time.stop)
  times: Time[];
}
