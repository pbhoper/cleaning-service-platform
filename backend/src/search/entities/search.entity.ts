import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Search {

  @PrimaryGeneratedColumn()

  @Column({type: 'date', nullable: true})
  date: Date;

  @Column()
  position: string

  @Column()
  schedule: number;

  @Column()
  cost: number;

  @Column()
  type: string;

}
