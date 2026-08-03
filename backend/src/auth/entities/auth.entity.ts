import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('auth')
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  username: string;

  @Column()
  email: string;

  @Column({nullable: true})
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;
}
