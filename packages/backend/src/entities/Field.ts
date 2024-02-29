import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Workspace } from './Workspace';
import { DataSet } from './DataSet';
import { FieldType } from '@/utils/types';

export interface FieldExportData {
  id: number;
  name: string;
  type: FieldType;
  fieldname: string;
  workspace?: Workspace;
  dataset?: DataSet;
  created_at: Date;
  updated_at: Date;
}

@Entity({
  name: 'fields',
})
export class Field {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  fieldname: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: FieldType,
    default: FieldType.STRING,
  })
  type: FieldType;

  @ManyToOne(() => Workspace)
  workspace: Workspace;

  @ManyToOne(() => DataSet)
  dataset: DataSet;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  public getData(): FieldExportData {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      fieldname: this.fieldname,
      workspace: this.workspace,
      dataset: this.dataset,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
