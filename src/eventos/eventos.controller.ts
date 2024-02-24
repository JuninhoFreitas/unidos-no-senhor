import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../enums/role.enum';
import { Roles } from '../decorators/role.decorator';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Obreiro)
  @Post()
  create(@Body() createEventoDto: CreateEventoDto) {
    return this.eventosService.create(createEventoDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Obreiro)
  @Get()
  async findAll() {
    return await this.eventosService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Obreiro)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const evento = await this.eventosService.findOne(id);
    if (!evento) {
      throw new HttpException('Evento não encontrado', HttpStatus.NOT_FOUND);
    }
    return evento;
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Obreiro)
  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateEventoDto: UpdateEventoDto) {
    const evento = await this.eventosService.findOne(id);
    if (!evento) {
      throw new HttpException('Evento não encontrado', HttpStatus.NOT_FOUND);
    }
    return this.eventosService.update(id, updateEventoDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Obreiro)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const evento = await this.eventosService.findOne(id);
    if (!evento) {
      throw new HttpException('Evento não encontrado', HttpStatus.NOT_FOUND);
    }
    await this.eventosService.remove(id);
    return null;
  }
}
