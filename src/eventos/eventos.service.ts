import { Injectable } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { Evento } from './entities/evento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DateFormat } from 'src/utils/date-format';

@Injectable()
export class EventosService {
  constructor(@InjectRepository(Evento) private readonly eventoRepository: Repository<Evento>) {}

  create(createEventoDto: CreateEventoDto) {
    const evento: Evento = new Evento();
    evento.nome = createEventoDto.nome;
    evento.descricao = createEventoDto.descricao;
    evento.data = DateFormat.apply(createEventoDto.data);
    return this.eventoRepository.save(evento);
  }

  findAll() {
    return this.eventoRepository.find();
  }

  findOne(id: string) {
    return this.eventoRepository.findOneBy({ id });
  }

  update(id: string, updateEventoDto: UpdateEventoDto) {
    const evento: Evento = new Evento();
    evento.id = id;
    evento.nome = updateEventoDto.nome;
    evento.descricao = updateEventoDto.descricao;
    evento.data = DateFormat.apply(updateEventoDto.data);
    return this.eventoRepository.save(evento);
  }

  remove(id: string) {
    return this.eventoRepository.delete(id);
  }
}
