import { BaseEntity, Column, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity({ name: 'calendar' })
@Unique(['agency_id', 'service_id', 'start_date'])
export class Calendar extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 30 })
  agency_id: string;

  @PrimaryColumn({ type: 'varchar', length: 30 })
  service_id: string;

  @Column()
  monday: boolean;

  @Column()
  tuesday: boolean;

  @Column()
  wednesday: boolean;

  @Column()
  thursday: boolean;

  @Column()
  friday: boolean;

  @Column()
  saturday: boolean;

  @Column()
  sunday: boolean;

  @PrimaryColumn({ type: 'bigint' })
  start_date: number;

  @Column({ type: 'bigint' })
  end_date: number;
}
