import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class ToBook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  ones: boolean;

  @Column()
  repeating: boolean;
}
