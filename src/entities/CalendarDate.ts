import { ServiceExceptionType } from 'src/static/utils/enums';
import { BaseEntity, PrimaryColumn, Entity } from 'typeorm';

@Entity({ name: 'calendardates' })
export class CalendarDate extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 15 })
  agency_id: string;

  @PrimaryColumn({ type: 'varchar', length: 30 })
  service_id: string;

  @PrimaryColumn({ type: 'bigint' })
  date: number;

  @PrimaryColumn({ type: 'enum', enum: ServiceExceptionType })
  exception_type: number;
}
