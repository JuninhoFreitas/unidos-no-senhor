import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//TÍTULO,AUTOR,EDITORA,ISBN,ANO DE IMPRESSÃO,OBSERVAÇÃO
@Entity()
export class Biblioteca {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 190 })
  titulo: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  autor: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  editora: string;

  @Column({ type: 'varchar', length: 190, nullable: true })
  isbn: string;

  @Column({ type: 'integer', nullable: true })
  anoDeImpressao: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  observacao: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  reservado: boolean;
}
