import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { User, UserExportData } from './User';
import { DataSource, DataSourceExportData } from './DataSource';
import { DataSet } from './DataSet';
import { Field } from './Field';
import { Chart } from './Chart';

export interface WorkspaceExportData {
  id: number;
  name: string;
  logo?: string;
  users?: UserExportData[];
  datasources?: DataSourceExportData[];
  created_at: Date;
  updated_at: Date;
}

@Entity({
  name: 'workspaces',
})
export class Workspace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    default: null,
  })
  logo: string;

  @JoinTable()
  @ManyToMany(() => User, (u) => u.workspaces)
  users: User[];

  @OneToMany(() => DataSource, (ds) => ds.workspace, {
    cascade: true,
  })
  datasources: DataSource[];

  @OneToMany(() => Chart, (ds) => ds.workspace, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  charts: Chart[];

  @OneToMany(() => DataSet, (ds) => ds.workspace, {
    cascade: true,
  })
  datasets: DataSet[];

  @OneToMany(() => DataSet, (ds) => ds.workspace, {
    cascade: true,
  })
  fields: Field[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  public getData(): WorkspaceExportData {
    return {
      id: this.id,
      name: this.name,
      logo: this.logo,
      users: this.users?.map((u) => u.getData()),
      datasources: this.datasources?.map((d) => d.getData()),
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
