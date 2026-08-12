import {
  Entity,
  PrimaryGeneratedColumn,
  Column, CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import { UserRole} from "../../user-role/entities/user-role.entity";
import {BookingStatus} from "../enum/booking.enum";

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserRole, { eager: true })
  client: UserRole;

  @ManyToOne(() => UserRole, { eager: true, nullable: true })
  company: UserRole;

  @Column()
  address: string;

  @Column('decimal', { precision: 8, scale: 2 })
  areaSqM: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @Column({ type: 'timestamp' })
  scheduledAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}