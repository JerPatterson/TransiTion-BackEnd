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
import { LocationType, WheelchairBoardingType } from 'src/static/utils/enums';
import { Time } from './Time';
import { Agency } from './Agency';

@Entity({ name: 'stops' })
@Unique(['stop_id', 'agency_id'])
export class Stop extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15 })
  agency_id: string;

  @Column({ type: 'varchar', length: 30 })
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

  @Column({ nullable: true, type: 'boolean' })
  stop_shelter: boolean;

  @Column({ nullable: true, type: 'boolean' })
  stop_display: boolean;

  @ManyToOne(() => Agency, (agency) => agency.stops)
  @JoinColumn({ name: 'agency_id', referencedColumnName: 'agency_id' })
  agency: Agency;

  @OneToMany(() => Time, (time) => time.stop)
  times: Time[];
}
