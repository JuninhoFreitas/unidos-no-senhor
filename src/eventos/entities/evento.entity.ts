import { Transform } from 'class-transformer';
import { DateFormat } from 'src/utils/date-format';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Evento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 190 })
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Transform(({ value }) => {
    return DateFormat.revert(value);
  })
  @Column({ type: 'date' })
  data: string;
}
