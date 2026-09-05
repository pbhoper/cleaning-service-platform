import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { RecurringFrequency } from '../dto/create-to-book.dto';

@Entity('bookings')
export class ToBookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientId: number; //+ сделать manytoOne

  @Column()
  companyId: number; //+ сделать manytoOne

  @Column()
  address: string;

  @Column({ type: 'date' })
  bookingDate: string;

  @Column({ default: false })
  isRecurring: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  recurringFrequency?: RecurringFrequency | string;

  @Column({ default: 'PENDING' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
