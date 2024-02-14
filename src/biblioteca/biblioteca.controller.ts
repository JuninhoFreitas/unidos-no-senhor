import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  ParseUUIDPipe,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { BibliotecaService } from './biblioteca.service';
import { CreateBibliotecaDto } from './dto/create-biblioteca.dto';
import { UpdateBibliotecaDto } from './dto/update-biblioteca.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/role.decorator';

@Controller('biblioteca')
@ApiTags('biblioteca')
export class BibliotecaController {
  constructor(private readonly bibliotecaService: BibliotecaService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post()
  create(@Body() createBibliotecaDto: CreateBibliotecaDto) {
    return this.bibliotecaService.create(createBibliotecaDto);
  }

  @Get()
  findAll() {
    return this.bibliotecaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const livro = await this.bibliotecaService.findOne(id);
    if (!livro) {
      throw new HttpException('Livro não encontrado', HttpStatus.NOT_FOUND);
    }
    return livro;
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBibliotecaDto: UpdateBibliotecaDto) {
    const livro = await this.bibliotecaService.findOne(id);
    if (!livro) {
      throw new HttpException('Livro não encontrado', HttpStatus.NOT_FOUND);
    }
    return this.bibliotecaService.update(id, updateBibliotecaDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const livro = await this.bibliotecaService.findOne(id);
    if (!livro) {
      throw new HttpException('Livro não encontrado', HttpStatus.NOT_FOUND);
    }
    return this.bibliotecaService.remove(id);
  }
}
