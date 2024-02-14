import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 15, nullable: true })
  telefone: string;

  @Column({ length: 14, nullable: true })
  cpf: string;

  @Column({ type: 'text', array: true, nullable: true })
  roles: string[];
}
