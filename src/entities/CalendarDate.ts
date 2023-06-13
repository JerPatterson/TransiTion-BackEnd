import { ServiceExceptionType } from 'src/static/utils/enums';
import { BaseEntity, Column, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity({ name: 'calendar' })
@Unique(['agency_id', 'service_id', 'date'])
export class Calendar extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 30 })
  agency_id: string;

  @PrimaryColumn({ type: 'varchar', length: 30 })
  service_id: string;

  @PrimaryColumn({ type: 'date' })
  date: Date;

  @Column({ type: 'enum', enum: ServiceExceptionType })
  exception_type: number;
}
