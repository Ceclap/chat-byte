import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "@core/database/entity/task.entity";

@Entity()
export class Auth{

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true})
  username!: string;

  @Column()
  password!: string;

  @Column({ default: null })
  photo!: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[];

  @Column({ default: false })
  confirmed!: boolean;

}