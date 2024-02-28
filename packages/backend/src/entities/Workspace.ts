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
import { User } from './User';
import { DataSource } from './DataSource';

export interface UserExportData {
  id: number;
  name: string;
  logo?: string;
  users: User[];
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

  @OneToMany(() => DataSource, (ds) => ds.creator, {
    cascade: true,
  })
  datasources: DataSource[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  public getData(): UserExportData {
    return {
      id: this.id,
      name: this.name,
      logo: this.logo,
      users: this.users,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
