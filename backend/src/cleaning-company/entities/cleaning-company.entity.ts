import {
  Entity,
  PrimaryGeneratedColumn,
  Column, CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('clients')
export class CleaningCompanyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ default: false })
  isCorporate: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
