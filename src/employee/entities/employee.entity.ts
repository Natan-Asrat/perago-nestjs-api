import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Employee, employee => employee.children, { nullable: true })
  @JoinColumn({ name: 'parentId' })
  parent: Employee;

  @Column({ nullable: true })
  parentId: string;

  @OneToMany(() => Employee, employee => employee.parent)
  children: Employee[];
}