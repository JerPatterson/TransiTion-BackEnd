import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'shapes' })
export class Shape extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 15 })
  agency_id: string;

  @PrimaryColumn({ type: 'varchar', length: 30 })
  shape_id: string;

  @Column({ type: 'double' })
  shape_pt_lat: number;

  @Column({ type: 'double' })
  shape_pt_lon: number;

  @PrimaryColumn({ type: 'int' })
  shape_pt_sequence: number;

  @Column({ nullable: true, type: 'float' })
  shape_dist_traveled: number;
}
