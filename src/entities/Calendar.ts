import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'calendar' })
export class Calendar extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 15 })
  agency_id: string;

  @PrimaryColumn({ type: 'varchar', length: 50 })
  service_id: string;

  @Column({ type: 'boolean' })
  monday: boolean;

  @Column({ type: 'boolean' })
  tuesday: boolean;

  @Column({ type: 'boolean' })
  wednesday: boolean;

  @Column({ type: 'boolean' })
  thursday: boolean;

  @Column({ type: 'boolean' })
  friday: boolean;

  @Column({ type: 'boolean' })
  saturday: boolean;

  @Column({ type: 'boolean' })
  sunday: boolean;

  @Column({ type: 'bigint' })
  start_date: number;

  @Column({ type: 'bigint' })
  end_date: number;
}
