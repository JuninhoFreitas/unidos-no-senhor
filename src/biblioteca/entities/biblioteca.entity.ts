import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//TÍTULO,AUTOR,EDITORA,ISBN,ANO DE IMPRESSÃO,OBSERVAÇÃO
@Entity()
export class Biblioteca {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 190 })
  titulo: string;

  @Column({ type: 'varchar', length: 190 })
  autor: string;

  @Column({ type: 'varchar', length: 190 })
  editora: string;

  @Column({ type: 'varchar', length: 190 })
  isbn: string;

  @Column({ type: 'integer' })
  anoDeImpressao: string;

  @Column({ type: 'varchar', length: 500 })
  observacao: string;
}
