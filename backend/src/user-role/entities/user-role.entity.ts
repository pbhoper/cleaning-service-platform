import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm';
import {Role} from "../enum/user-role.enum";

@Entity('user_roles')
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Role,
    unique: true,
  })
  name: Role;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => UserRole, { eager: true })
  role: UserRole;
}