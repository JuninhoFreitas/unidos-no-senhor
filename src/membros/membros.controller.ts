import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseUUIDPipe, HttpException, HttpStatus } from '@nestjs/common';
import { MembrosService } from './membros.service';
import { CreateMembroDto } from './dto/create-membro.dto';
import { UpdateMembroDto } from './dto/update-membro.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('membro')
@ApiTags('membro')
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

  // must be UUID
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const membro = await this.membrosService.findOne(id);
    if (!membro) {
      throw new HttpException('Membro não encontrado', HttpStatus.NOT_FOUND);
    }
    return membro;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMembroDto: UpdateMembroDto) {
    const membro = await this.membrosService.findOne(id);
    if (!membro) {
      throw new HttpException('Membro não encontrado', HttpStatus.NOT_FOUND);
    }
    return await this.membrosService.update(id, updateMembroDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const membro = await this.membrosService.findOne(id);
    if (!membro) {
      throw new HttpException('Membro não encontrado', HttpStatus.NOT_FOUND);
    }
    await this.membrosService.remove(id);
    return null;
  }
}
