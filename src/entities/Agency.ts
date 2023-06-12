import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'agencies' })
export class Agency extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 30 })
  agency_id: string;

  @Column()
  agency_name: string;

  @Column()
  agency_url: string;

  @Column({ type: 'varchar', length: 30 })
  agency_timezone: string;

  @Column({ nullable: true, type: 'varchar', length: 30 })
  agency_lang: string;

  @Column({ nullable: true, type: 'varchar', length: 30 })
  agency_phone: string;

  @Column({ nullable: true })
  agency_fare_url: string;

  @Column({ nullable: true })
  agency_email: string;
}
