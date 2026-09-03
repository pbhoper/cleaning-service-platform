import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cleaning_companies')
export class CleaningCompanyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column('double precision', { nullable: true })
  latitude: number;

  @Column('double precision', { nullable: true })
  longitude: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  logo: string;

  @Column('simple-array', { nullable: true })
  serviceTypes: string[];

  @Column('decimal', { precision: 10, scale: 2, default: 50 })
  pricePerSqM: number;

  @Column('json', { nullable: true })
  basePrices: {
    smallRoom: number;
    largeRoom: number;
    bathroom: number;
  };

  @Column('json', { nullable: true })
  coefficients: Record<string, number>;

  @Column({ default: 'company' })
  role: string;

  @Column('decimal', { precision: 3, scale: 2, default: 5.0 })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: 'active' })
  status: 'active' | 'blocked';

  @Column({ nullable: true })
  blockReason: string;
}