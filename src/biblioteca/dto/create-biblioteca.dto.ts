import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateBibliotecaDto {
  @IsString()
  @ApiProperty()
  @MinLength(3, { message: 'Título deve ter no mínimo 3 caracteres' })
  titulo: string;

  @IsString()
  @ApiProperty()
  autor: string;

  @IsString()
  @ApiProperty()
  editora: string;

  @IsString()
  @ApiProperty()
  isbn: string;

  @IsNumber()
  @ApiProperty()
  anoDeImpressao: number;

  @IsString()
  @ApiProperty()
  observacao: string;
}
