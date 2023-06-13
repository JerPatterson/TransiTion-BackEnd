import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Stop } from './Stop';
import { Route } from './Route';
import { Trip } from './Trip';
import { Calendar } from './Calendar';
import { CalendarDate } from './CalendarDate';
import { Shape } from './Shape';
import { Time } from './Time';

@Entity({ name: 'agencies' })
@Unique(['agency_id'])
export class Agency extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15 })
  agency_id: string;

  @Column()
  agency_name: string;

  @Column()
  agency_url: string;

  @Column({ type: 'varchar', length: 40 })
  agency_timezone: string;

  @Column({ nullable: true, type: 'varchar', length: 20 })
  agency_lang: string;

  @Column({ nullable: true, type: 'varchar', length: 20 })
  agency_phone: string;

  @Column({ nullable: true })
  agency_fare_url: string;

  @Column({ nullable: true })
  agency_email: string;

  @OneToMany(() => Stop, (stop) => stop.agency)
  stops: Stop[];

  @OneToMany(() => Route, (route) => route.agency)
  routes: Route[];

  @OneToMany(() => Trip, (trip) => trip.agency)
  trips: Trip[];

  @OneToMany(() => Time, (time) => time.agency)
  times: Time[];

  @OneToMany(() => Calendar, (calendar) => calendar.agency)
  calendar: Calendar[];

  @OneToMany(() => CalendarDate, (calendar_date) => calendar_date.agency)
  calendar_dates: CalendarDate[];

  @OneToMany(() => Shape, (shape) => shape.agency)
  shapes: Shape[];
}
