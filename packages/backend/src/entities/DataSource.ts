import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './User';

import { DataSourceType } from '@/utils/types';
import { Workspace } from './Workspace';
import { DataSet } from './DataSet';

export interface DataSourceExportData {
  id: number;
  name: string;
  type: DataSourceType;
  creator?: number;
  workspace?: number;
  dataset_count?: number;
  connect: {
    ip: string;
    port: number;
    user: string;
    password: string;
    database: string;
  };
  created_at: Date;
  updated_at: Date;
}

@Entity({
  name: 'datasources',
})
export class DataSource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: DataSourceType,
    default: DataSourceType.MYSQL,
  })
  type: DataSourceType;

  @Column({
    nullable: false,
  })
  ip: string;

  @Column({
    nullable: false,
  })
  port: number;

  @Column({
    nullable: false,
  })
  dbuser: string;

  @Column({
    nullable: true,
  })
  password: string;

  @Column({
    nullable: false,
  })
  database: string;

  @ManyToOne(() => User)
  creator: User;

  @ManyToOne(() => Workspace)
  workspace: Workspace;

  @OneToMany(() => DataSet, (ds) => ds.datasource, {
    cascade: true,
  })
  datasets: DataSet[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  public getData(): DataSourceExportData {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      connect: {
        ip: this.ip,
        port: this.port,
        user: this.dbuser,
        password: this.password,
        database: this.database,
      },
      dataset_count: this.datasets?.length,
      workspace: this.workspace?.id,
      creator: this.creator?.id,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
