import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Agency } from './Agency';

@Entity({ name: 'calendar' })
@Unique(['agency_id', 'service_id'])
export class Calendar extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15 })
  agency_id: string;

  @Column({ type: 'varchar', length: 30 })
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

  @ManyToOne(() => Agency, (agency) => agency.calendar)
  @JoinColumn({ name: 'agency_id', referencedColumnName: 'agency_id' })
  agency: Agency;
}
