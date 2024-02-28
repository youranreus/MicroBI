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
import { Workspace } from './Workspace';
import { DataSource } from './DataSource';

export interface UserExportData {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  workspaces?: Workspace[];
  created_at: Date;
  updated_at: Date;
}

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    default: null,
  })
  avatar: string;

  @JoinTable()
  @ManyToMany(() => Workspace, (u) => u.users)
  workspaces: Workspace[];

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
      email: this.email,
      avatar: this.avatar,
      workspaces: this.workspaces,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
