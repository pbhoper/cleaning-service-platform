import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ default: false })
  isCorporate: boolean;

  @Column({ default: true })
  notificationsEnabled: boolean;

  @Column({ nullable: true, default: 2 })
  notificationHours: number;

  @Column({ nullable: true, type: 'text' })
  avatar: string;

  @Column({ nullable: true })
  password?: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ default: 'active' })
  status: 'active' | 'blocked';

  @Column({ nullable: true })
  blockReason: string;
}
