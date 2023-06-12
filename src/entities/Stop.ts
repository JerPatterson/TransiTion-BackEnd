import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { LocationType, WheelchairBoardingType } from 'src/static/utils/enums';
import { Time } from './Time';

@Entity({ name: 'stops' })
@Unique(['stop_id', 'stop_agency_id'])
export class Stop extends BaseEntity {
  @PrimaryColumn()
  stop_agency_id: string;

  @PrimaryColumn()
  stop_id: string;

  @Column({ nullable: true })
  stop_code: string;

  @Column()
  stop_name: string;

  @Column({ nullable: true })
  stop_desc: string;

  @Column({ type: 'float' })
  stop_lat: number;

  @Column({ type: 'float' })
  stop_lon: number;

  @Column({ nullable: true })
  zone_id: string;

  @Column({ nullable: true })
  stop_url: string;

  @Column({ type: 'enum', enum: LocationType })
  location_type: number;

  @OneToOne(() => Stop, (parent_station) => parent_station.stop_id)
  parent_station: string;

  @Column({ nullable: true })
  stop_timezone: string;

  @Column({ type: 'enum', enum: WheelchairBoardingType, nullable: true })
  wheelchair_boarding: number;

  @Column({ nullable: true })
  level_id: string;

  @Column({ nullable: true })
  platform_code: string;

  @Column({ nullable: true })
  stop_shelter: boolean;

  @Column({ nullable: true })
  stop_display: boolean;

  @OneToMany(() => Time, (time) => time.stop)
  times: Time[];
}
