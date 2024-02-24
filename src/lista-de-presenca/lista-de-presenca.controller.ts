import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  ParseUUIDPipe,
  Headers,
  Query,
  Patch,
} from '@nestjs/common';
import { ListaDePresencaService } from './lista-de-presenca.service';
import { CreateListaDePresencaDto } from './dto/create-lista-de-presenca.dto';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../enums/role.enum';
import { Roles } from '../decorators/role.decorator';
import { EventosService } from '../eventos/eventos.service';
import { TokenService } from 'src/token/token.service';
import { CreateParticipantesDto } from './dto/create-participante.dto';
import { MembrosService } from 'src/membros/membros.service';
import { FindAllListaDePresencaQueryParams, FindAllParticipantesQueryParams } from './dto/query-params.dto';
import { UpdateParticipantesDto } from './dto/update-participante.dto';

@Controller('lista-de-presenca')
export class ListaDePresencaController {
  constructor(
    private readonly listaDePresencaService: ListaDePresencaService,
    private readonly eventosService: EventosService,
    private readonly membrosService: MembrosService,
    private readonly tokenService: TokenService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Obreiro)
  @Post()
  async upsert(@Headers() headers: { authorization: string }, @Body() createListaDePresencaDto: CreateListaDePresencaDto) {
    // Look for the event and the participant
    // If they don't exist, throw an error

    const evento = await this.eventosService.findOne(createListaDePresencaDto.evento_id);
    if (!evento) {
      throw new HttpException('Evento não encontrado', HttpStatus.NOT_FOUND);
    }
    const participantes = await this.listaDePresencaService.findAllParcipantesInArray(createListaDePresencaDto.participante_id);
    if (participantes.length === 0) {
      throw new HttpException('Participantes não encontrado', HttpStatus.NOT_FOUND);
    }
    const responsavel = await this.tokenService.getUser(headers.authorization);
    //Get the user from the token in the request

    return this.listaDePresencaService.upsert(evento, participantes, responsavel);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Obreiro)
  @Post('participantes')
  async createParticipante(@Body() createParticipanteDto: CreateParticipantesDto) {
    if (createParticipanteDto.membro_id !== null) {
      const membro = await this.membrosService.findOne(createParticipanteDto.membro_id);
      if (!membro) {
        throw new HttpException('Membro não encontrado', HttpStatus.NOT_FOUND);
      }
    }
    return this.listaDePresencaService.createParticipante(createParticipanteDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Obreiro)
  @Patch('participantes/:id')
  async updateParticipante(@Param('id', ParseUUIDPipe) id: string, @Body() updateParticipanteDto: UpdateParticipantesDto) {
    if (updateParticipanteDto.membro_id !== null) {
      const membro = await this.membrosService.findOne(updateParticipanteDto.membro_id);
      if (!membro) {
        throw new HttpException('Membro não encontrado', HttpStatus.NOT_FOUND);
      }
    }
    return await this.listaDePresencaService.updateParticipante(id, updateParticipanteDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Obreiro)
  @Get('participantes')
  async listParticipantes(@Query() query: FindAllParticipantesQueryParams) {
    return this.listaDePresencaService.findAllParticipantes(query);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Obreiro)
  @Get()
  async findAll(@Query() query: FindAllListaDePresencaQueryParams) {
    return await this.listaDePresencaService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Obreiro)
  @Get('buscar/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const listaDePresenca = await this.listaDePresencaService.findOne(id);
    if (!listaDePresenca) {
      throw new HttpException('Lista de Presença não encontrada', HttpStatus.NOT_FOUND);
    }
    return listaDePresenca;
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Obreiro)
  @Delete('deletar/:id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const listaDePresenca = await this.listaDePresencaService.findOne(id);
    if (!listaDePresenca) {
      throw new HttpException('Lista de Presença não encontrada', HttpStatus.NOT_FOUND);
    }
    await this.listaDePresencaService.remove(id);
    return null;
  }
}
