import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'todos' })
export class TodosEntity {
	@PrimaryGeneratedColumn()
	id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  deadline: Date;
}
