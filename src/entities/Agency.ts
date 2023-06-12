import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'agencies' })
export class Agency extends BaseEntity {
  @PrimaryColumn()
  agency_id: string;

  @Column()
  agency_name: string;

  @Column()
  agency_url: string;

  @Column()
  agency_timezone: string;

  @Column({ nullable: true })
  agency_lang: string;

  @Column({ nullable: true })
  agency_phone: string;

  @Column({ nullable: true })
  agency_fare_url: string;

  @Column({ nullable: true })
  agency_email: string;
}
