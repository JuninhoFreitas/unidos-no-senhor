import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { MembrosService } from './membros.service';
import { CreateMembroDto } from './dto/create-membro.dto';
import { UpdateMembroDto } from './dto/update-membro.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('membros')
@ApiTags('membros')
export class MembrosController {
  constructor(private readonly membrosService: MembrosService) {}

  @Post()
  create(@Body() createMembroDto: CreateMembroDto) {
    return this.membrosService.create(createMembroDto);
  }

  @Get()
  findAll() {
    return this.membrosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membrosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMembroDto: UpdateMembroDto) {
    return this.membrosService.update(id, updateMembroDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    this.membrosService.remove(id);
    return null;
  }
}
