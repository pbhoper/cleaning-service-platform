import {
  Entity,
  Column,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('cleaning_companies')
export class SearchEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column('decimal')
  price: number;

  @Column()
  cleaningType: string;

  @Column()
  schedule: string;

  @Column({ type: 'date', nullable: true })
  availableDate: string;

  @Column({ default: 0 })
  rating: number;
}