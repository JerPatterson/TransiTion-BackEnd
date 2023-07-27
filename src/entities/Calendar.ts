import { ServiceDayType } from 'src/static/utils/enums';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'calendar' })
export class Calendar extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 15 })
  agency_id: string;

  @PrimaryColumn({ type: 'varchar', length: 50 })
  service_id: string;

  @Column({ type: 'enum', enum: ServiceDayType })
  monday: ServiceDayType;

  @Column({ type: 'enum', enum: ServiceDayType })
  tuesday: ServiceDayType;

  @Column({ type: 'enum', enum: ServiceDayType })
  wednesday: ServiceDayType;

  @Column({ type: 'enum', enum: ServiceDayType })
  thursday: ServiceDayType;

  @Column({ type: 'enum', enum: ServiceDayType })
  friday: ServiceDayType;

  @Column({ type: 'enum', enum: ServiceDayType })
  saturday: ServiceDayType;

  @Column({ type: 'enum', enum: ServiceDayType })
  sunday: ServiceDayType;

  @Column({ type: 'bigint' })
  start_date: number;

  @Column({ type: 'bigint' })
  end_date: number;
}
