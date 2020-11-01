/* Coffee Entity - FINAL CODE */
import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity() // sql table === 'coffee'
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  name: string;

  @Column()
  brand: string;

  @Column({ default: 0})
  recommendations: number

  @JoinTable()
  @ManyToMany(
    type => Flavor,
    flavor => flavor.coffees,
    { cascade: true} // insert 2 table
  )
  flavors: Flavor[];
}
