import { Membro } from 'src/membros/entities/membro.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Participante {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 190 })
  nome: string;

  //membro_id é uma chave estrangeira para a tabela de membros

  @Column('uuid')
  @OneToOne(() => Membro, (membro) => membro.id, { nullable: true })
  membro_id: string;
}
