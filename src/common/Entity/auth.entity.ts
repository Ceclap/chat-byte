import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({ default: false })
  confirmed!: boolean;

}