import { Injectable } from '@nestjs/common';
import { ListaDePresenca as ListaDePresenca } from './entities/lista-de-presenca.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Evento } from 'src/eventos/entities/evento.entity';
import { Participante } from './entities/participantes.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { CreateParticipantesDto } from './dto/create-participante.dto';
import { FindAllListaDePresencaQueryParams, FindAllParticipantesQueryParams } from './dto/query-params.dto';
import { UpdateParticipantesDto } from './dto/update-participante.dto';

@Injectable()
export class ListaDePresencaService {
  constructor(
    @InjectRepository(ListaDePresenca) private readonly listaDePresencaRepository: Repository<ListaDePresenca>,
    @InjectRepository(Participante) private readonly participanteRepository: Repository<Participante>,
  ) {}

  async upsert(evento: Evento, participantes: Participante[], responsavel: Usuario) {
    console.log('Participantes', participantes);
    // Se todos os participantes foram removidos da lista de presença, deleta a lista de presença
    if (participantes.length === 0) {
      return await this.listaDePresencaRepository.delete({
        evento_id: evento.id,
      });
    }

    const participantesIds = participantes.map((participante) => participante.id);
    const query = `SELECT * FROM lista_de_presenca WHERE evento_id = '${evento.id}' AND participante_id in (${participantesIds
      .map((id) => `'${id}'`)
      .join(',')});`;

    const participantesJaInseridos = await this.listaDePresencaRepository.query(query);

    if (participantesJaInseridos.length > 0) {
      const participantesJaInseridosIds = participantesJaInseridos.map((participante) => participante.participante_id);
      participantes = participantes.filter((participante) => !participantesJaInseridosIds.includes(participante.id));
    }

    // Procura por participantes removidos
    const queryToFindRemovedParticipants = `SELECT * FROM lista_de_presenca WHERE evento_id = '${
      evento.id
    }' AND participante_id not in (${participantesIds.map((id) => `'${id}'`).join(',')});`;

    const participantesRemovidos = await this.listaDePresencaRepository.query(queryToFindRemovedParticipants);

    // Se houver participantes removidos, remove-os da lista de presença
    if (participantesRemovidos.length > 0) {
      const participantesRemovidosIds = participantesRemovidos.map((participante) => participante.participante_id);
      participantesRemovidosIds.forEach((id) => {
        this.listaDePresencaRepository.delete({ evento_id: evento.id, participante_id: id });
      });
    }

    // Se não tem participantes para inserir, retorna os participantes que já estavam inseridos
    if (participantes.length === 0) {
      return participantesJaInseridos;
    }

    let bulkInsert = 'INSERT INTO lista_de_presenca (evento_id, participante_id, responsavel_id) VALUES';
    participantes.forEach((participante) => {
      bulkInsert += `('${evento.id}', '${participante.id}', ${responsavel.id}),`;
    });

    bulkInsert = bulkInsert.slice(0, -1);

    bulkInsert += ' RETURNING *;';

    return this.listaDePresencaRepository.query(bulkInsert);
  }

  findAll(query: FindAllListaDePresencaQueryParams) {
    return this.listaDePresencaRepository.find({
      where: {
        evento_id: query.evento_id,
        participante_id: query.participante_id,
        responsavel_id: query.responsavel_id,
      },
      take: query.limit,
      skip: query.offset,
    });
  }

  findOne(id: string) {
    return this.listaDePresencaRepository.findOneBy({ id });
  }

  remove(id: string) {
    return this.listaDePresencaRepository.delete(id);
  }

  createParticipante(createParticipantesDto: CreateParticipantesDto): Promise<Participante> {
    const participante: Participante = new Participante();
    participante.membro_id = createParticipantesDto.membro_id;
    participante.nome = createParticipantesDto.nome;
    return this.participanteRepository.save(participante);
  }

  findOneParticipante(id: string): Promise<Participante> {
    return this.participanteRepository.findOneBy({ id });
  }

  findAllParticipantes(query: FindAllParticipantesQueryParams): Promise<Participante[]> {
    // a query de nome deve ser apenas parecida, e não exatamente igual
    return this.participanteRepository.find({
      where: {
        nome: ILike(`%${query.nome || ''}%`),
      },
      take: query.limit,
      skip: query.offset,
    });
  }

  findAllParticipantesInArray(ids: string[]): Promise<Participante[]> {
    const query = `SELECT * FROM participante WHERE id IN (${ids.map((id) => `'${id}'`).join(',')});`;

    return this.participanteRepository.query(query);
  }

  updateParticipante(id: string, updateParticipantesDto: UpdateParticipantesDto): Promise<Participante> {
    const participante: Participante = new Participante();
    participante.id = id;
    participante.membro_id = updateParticipantesDto.membro_id;
    participante.nome = updateParticipantesDto.nome;
    return this.participanteRepository.save(participante);
  }
}
