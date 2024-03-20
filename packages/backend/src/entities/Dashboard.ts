import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Workspace } from './Workspace';
import { Chart } from './Chart';

export interface DashboardPosition {
  x: number;
  y: number;
  w: number;
  h: number;
  chart: number;
}

export interface BoardExportData {
  id: number;
  name: string;
  creator?: User;
  workspace?: Workspace;
  charts?: ({ data: Chart } & DashboardPosition)[];
  updated_at: Date;
  created_at: Date;
}

@Entity({
  name: 'dashboards',
})
export class Dashboard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @ManyToOne(() => User)
  creator: User;

  @ManyToOne(() => Workspace)
  workspace: Workspace;

  @JoinTable()
  @ManyToMany(() => Chart, (u) => u.dashboards)
  charts: Chart[];

  @Column('simple-json')
  positions: DashboardPosition[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  public getData(): BoardExportData {
    const charts = this.positions.map((pos) => ({
      ...pos,
      data: this.charts?.find((c) => c.id === pos.chart),
    }));

    return {
      id: this.id,
      name: this.name,
      creator: this.creator,
      charts,
      workspace: this.workspace,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
