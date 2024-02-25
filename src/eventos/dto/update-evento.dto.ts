import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateEventoDto } from './create-evento.dto';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateEventoDto extends PartialType(CreateEventoDto) {
  @IsString()
  @ApiProperty()
  @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  descricao: string;

  @IsString()
  @ApiPropertyOptional()
  data: string;
}
