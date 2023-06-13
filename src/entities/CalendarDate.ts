import { ServiceExceptionType } from 'src/static/utils/enums';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Agency } from './Agency';

@Entity({ name: 'calendardates' })
export class CalendarDate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15 })
  agency_id: string;

  @Column({ type: 'varchar', length: 30 })
  service_id: string;

  @Column({ type: 'bigint' })
  date: number;

  @Column({ type: 'enum', enum: ServiceExceptionType })
  exception_type: number;

  @ManyToOne(() => Agency, (agency) => agency.calendar_dates)
  @JoinColumn({ name: 'agency_id', referencedColumnName: 'agency_id' })
  agency: Agency;
}
