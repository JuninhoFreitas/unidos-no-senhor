import { Injectable } from '@nestjs/common';
import { CreateMembroDto } from './dto/create-membro.dto';
import { UpdateMembroDto } from './dto/update-membro.dto';
import { Membro } from './entities/membro.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DateFormat } from '../utils/date-format';

@Injectable()
export class MembrosService {
  constructor(@InjectRepository(Membro) private readonly membroRepository: Repository<Membro>) {}

  async create(createMembroDto: CreateMembroDto): Promise<Membro> {
    const membro: Membro = new Membro();
    membro.nome = createMembroDto.nome;
    membro.email = createMembroDto.email;
    membro.telefone = createMembroDto.telefone;
    membro.dataNascimento = DateFormat.apply(createMembroDto.dataNascimento);
    membro.dataBatismo = DateFormat.apply(createMembroDto.dataBatismo);
    membro.cargo = createMembroDto.cargo;
    membro.dataEntrada = DateFormat.apply(createMembroDto.dataEntrada);
    membro.dataSaida = DateFormat.apply(createMembroDto.dataSaida);
    membro.situacao = createMembroDto.situacao;
    membro.observacao = createMembroDto.observacao;
    return this.membroRepository.save(membro);
  }

  async findAll(): Promise<Membro[]> {
    return this.membroRepository.find();
  }

  findOne(id: string): Promise<Membro> {
    return this.membroRepository.findOneBy({ id });
  }

  update(id: string, updateMembroDto: UpdateMembroDto): Promise<Membro> {
    const membro: Membro = new Membro();
    membro.id = id;
    membro.nome = updateMembroDto.nome;
    membro.email = updateMembroDto.email;
    membro.telefone = updateMembroDto.telefone;
    membro.dataNascimento = DateFormat.apply(updateMembroDto.dataNascimento);
    membro.dataBatismo = DateFormat.apply(updateMembroDto.dataBatismo);
    membro.cargo = updateMembroDto.cargo;
    membro.dataEntrada = DateFormat.apply(updateMembroDto.dataEntrada);
    membro.dataSaida = DateFormat.apply(updateMembroDto.dataSaida);
    membro.situacao = updateMembroDto.situacao;
    membro.observacao = updateMembroDto.observacao;
    return this.membroRepository.save(membro);
  }

  remove(id: string) {
    return this.membroRepository.delete(id);
  }
}
