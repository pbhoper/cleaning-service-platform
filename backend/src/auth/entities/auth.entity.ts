import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from "typeorm";
import { Role } from "../../user-role/enum/user.enum";

@Entity('users')
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: true })
  username: string | null;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password: string | null;

  @Column()
  firstName: string;

  @Column({ type: 'varchar', nullable: true })
  lastName: string | null;

  @Column({ default: false })
  isConfirmed: boolean;

  @Column({ type: 'varchar', nullable: true })
  confirmationToken: string | null;

  @Column({ type: 'varchar', nullable: true })
  provider: string | null;

  @Column({ type: 'varchar', nullable: true })
  providerId: string | null;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CLIENT,
  })
  role: Role;
}