import { ServiceExceptionType } from 'src/static/utils/enums';
import { BaseEntity, Column, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity({ name: 'calendardates' })
@Unique(['agency_id', 'service_id', 'date'])
export class CalendarDate extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 30 })
  agency_id: string;

  @PrimaryColumn({ type: 'varchar', length: 30 })
  service_id: string;

  @PrimaryColumn({ type: 'bigint' })
  date: number;

  @Column({ type: 'enum', enum: ServiceExceptionType })
  exception_type: number;
}
