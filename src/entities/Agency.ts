import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Stop } from './Stop';

@Entity({ name: 'agencies' })
export class Agency extends BaseEntity {
  @PrimaryGeneratedColumn()
  generated_id: string;

  @Column({ unique: true })
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  timezone: string;

  @Column({ nullable: true })
  lang: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  fare_url: string;

  @Column({ nullable: true })
  email: string;

  @OneToMany(() => Stop, (stop) => stop.agency)
  stops: Stop[];
}
