import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { BibliotecaService } from './biblioteca.service';
import { CreateBibliotecaDto } from './dto/create-biblioteca.dto';
import { UpdateBibliotecaDto } from './dto/update-biblioteca.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('biblioteca')
@ApiTags('biblioteca')
export class BibliotecaController {
  constructor(private readonly bibliotecaService: BibliotecaService) {}

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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBibliotecaDto: UpdateBibliotecaDto) {
    const livro = await this.bibliotecaService.findOne(id);
    if (!livro) {
      throw new HttpException('Livro não encontrado', HttpStatus.NOT_FOUND);
    }
    return this.bibliotecaService.update(id, updateBibliotecaDto);
  }

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
