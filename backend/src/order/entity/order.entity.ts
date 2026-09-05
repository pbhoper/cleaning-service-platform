import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  companyId: number;

  @Column({ nullable: true })
  userId: number;

  @Column()
  clientName: string;

  @Column()
  serviceType: string;

  @Column()
  address: string;

  @Column({ default: 0 })
  smallRooms: number;

  @Column({ default: 0 })
  largeRooms: number;

  @Column({ default: 0 })
  bathrooms: number;

  @Column()
  price: number;

  @Column()
  estimatedTimeMinutes: number;

  @Column({ default: 'open' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
