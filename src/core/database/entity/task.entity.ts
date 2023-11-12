import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Auth } from "@core/database/entity/auth.entity";

@Entity()
export class Task{

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  userId!:string

  @Column()
  title!:string

  @Column()
  text!:string

  @ManyToOne(() => Auth, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user!: Auth;

  @CreateDateColumn()
  createAt!: Date

  @UpdateDateColumn()
  updateAt!: Date
}