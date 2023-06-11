import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Agency } from './Agency';
import { LocationType, WheelchairBoardingType } from 'src/static/utils/enums';

@Entity({ name: 'stops' })
@Unique(['id', 'agency'])
export class Stop extends BaseEntity {
  @PrimaryGeneratedColumn()
  generated_id: string;

  @Column()
  id: string;

  @Column({ nullable: true })
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  desc: string;

  @Column({ type: 'float' })
  lat: number;

  @Column({ type: 'float' })
  lon: number;

  @Column({ nullable: true })
  zone_id: string;

  @Column({ nullable: true })
  stop_url: string;

  @Column({ type: 'enum', enum: LocationType })
  location_type: number;

  @OneToOne(() => Stop, (parent_station) => parent_station.id)
  parent_station: string;

  @Column({ nullable: true })
  timezone: string;

  @Column({ type: 'enum', enum: WheelchairBoardingType, nullable: true })
  wheelchair_boarding: number;

  @Column({ nullable: true })
  level_id: string;

  @Column({ nullable: true })
  platform_code: string;

  @ManyToOne(() => Agency, (agency) => agency.stops)
  agency: Agency;
}
