import {
  Entity,
  PrimaryGeneratedColumn,
  Column, CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import { UserRole} from "../../user-role/entities/user.entity";
import * as bookingEnum from "../consts/booking.enum";

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserRole)
  client: UserRole;

  @ManyToOne(() => UserRole, {nullable: true})
  company: UserRole;

  @Column()
  address: string;

  @Column('decimal', {precision: 8, scale: 2})
  areaSqM: number;

  @Column('decimal', {precision: 10, scale: 2})
  totalPrice: number;

  @Column({
    type: 'enum',
    enum: bookingEnum.BOOKING_STATUS,
    default: bookingEnum.BOOKING_STATUS.PENDING,
  })
  status: bookingEnum.BookingStatus;

  @Column({ type: 'timestamp' })
  scheduledAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}