import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from "typeorm";
import {Role} from "../../user-role/enum/user-role.enum";

@Entity('users')
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  username: string | null;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string | null;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string | null;

  @Column({ default: false })
  isConfirmed: boolean;

  @Column({ nullable: true })
  confirmationToken: string | null;

  @Column({ nullable: true })
  provider: string | null;

  @Column({ nullable: true })
  providerId: string | null;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CLIENT,
  })
  role: Role;

}