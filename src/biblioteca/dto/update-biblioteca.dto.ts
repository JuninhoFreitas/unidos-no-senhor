import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBibliotecaDto } from './create-biblioteca.dto';
import { IsBoolean, IsNumberString, IsString, MinLength } from 'class-validator';

export class UpdateBibliotecaDto extends PartialType(CreateBibliotecaDto) {
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

  @IsNumberString()
  @ApiProperty()
  anoDeImpressao: string;

  @IsString()
  @ApiProperty()
  observacao: string;

  @ApiProperty()
  @IsBoolean()
  reservado: boolean;
}
