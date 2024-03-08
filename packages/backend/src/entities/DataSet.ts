import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Workspace } from './Workspace';
import { DataSource } from './DataSource';
import { Field } from './Field';

export interface DataSetExportData {
  id: number;
  name: string;
  tablename: string;
  datasource?: number;
  workspace?: number;
  created_at: Date;
  updated_at: Date;
}

@Entity({
  name: 'datasets',
})
export class DataSet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  tablename: string;

  @ManyToOne(() => Workspace)
  workspace: Workspace;

  @ManyToOne(() => DataSource)
  datasource: DataSource;

  @OneToMany(() => Field, (f) => f.dataset, {
    cascade: true,
  })
  fields: Field[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  public getData(): DataSetExportData {
    return {
      id: this.id,
      name: this.name,
      tablename: this.tablename,
      workspace: this.workspace?.id,
      datasource: this.datasource?.id,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
