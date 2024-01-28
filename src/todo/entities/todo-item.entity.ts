import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn } from 'typeorm';

@Entity()
export class TodoItem {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ default: false })
  done: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

}