import { Evento } from 'src/eventos/entities/evento.entity';
import { Column, Entity, Generated, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Participante } from './participantes.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity()
export class ListaDePresenca {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  @OneToOne(() => Evento, (evento) => evento.id)
  evento_id: string;

  @Column('uuid')
  @OneToOne(() => Participante, (participante) => participante.id)
  participante_id: string;

  // Type of responsavel_id is serial4
  @Generated('increment')
  @Column()
  @OneToOne(() => Usuario, (usuario) => usuario.id)
  responsavel_id: number;
}
