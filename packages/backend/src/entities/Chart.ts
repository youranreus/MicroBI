import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Workspace } from './Workspace';
import { Field } from './Field';
import { User } from './User';
import { Dashboard } from './Dashboard';

export interface ChartExportData {
  id: number;
  name: string;
  dims: Field[];
  quotas: Field[];
  filters: Field[];
  type: string;
  updated_at: Date;
  created_at: Date;
}

@Entity({
  name: 'charts',
})
export class Chart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  type: string;

  @JoinTable()
  @ManyToMany(() => Field, (u) => u.asQuota)
  quotas: Field[];

  @JoinTable()
  @ManyToMany(() => Field, (u) => u.asDim)
  dims: Field[];

  @JoinTable()
  @ManyToMany(() => Field, (u) => u.asFilter)
  filters: Field[];

  @ManyToMany(() => Dashboard, (u) => u.charts)
  dashboards: Dashboard[];

  @ManyToOne(() => User)
  owner: User;

  @ManyToOne(() => Workspace)
  workspace: Workspace;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  public getData(): ChartExportData {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      quotas: this.quotas,
      dims: this.dims,
      filters: this.filters,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
