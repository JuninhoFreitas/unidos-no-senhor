import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { MembrosService } from './membros.service';
import { CreateMembroDto } from './dto/create-membro.dto';
import { UpdateMembroDto } from './dto/update-membro.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from '../guards/roles.guard';

@Controller('membro')
@ApiTags('membro')
export class MembrosController {
  constructor(private readonly membrosService: MembrosService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post()
  create(@Body() createMembroDto: CreateMembroDto) {
    return this.membrosService.create(createMembroDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.membrosService.findAll();
  }

  // must be UUID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const membro = await this.membrosService.findOne(id);
    if (!membro) {
      throw new HttpException('Membro não encontrado', HttpStatus.NOT_FOUND);
    }
    return membro;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMembroDto: UpdateMembroDto) {
    const membro = await this.membrosService.findOne(id);
    if (!membro) {
      throw new HttpException('Membro não encontrado', HttpStatus.NOT_FOUND);
    }
    return await this.membrosService.update(id, updateMembroDto);
  }

  @UseGuards(JwtAuthGuard)
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
