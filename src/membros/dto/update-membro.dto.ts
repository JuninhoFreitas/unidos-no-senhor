import { PartialType } from '@nestjs/mapped-types';
import { CreateMembroDto } from './create-membro.dto';
import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMembroDto extends PartialType(CreateMembroDto) {
  @IsString()
  @ApiProperty()
  @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsOptional()
  @Matches(/^[0-9]{3}[0-9]{3}[0-9]{3}[0-9]{2}$/, { message: 'CPF inválido' })
  @ApiPropertyOptional()
  cpf: string;

  @IsEmail()
  @ApiPropertyOptional()
  @IsOptional()
  email: string;

  @IsString()
  @IsMobilePhone('pt-BR')
  @ApiProperty()
  telefone: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  endereco: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  bairro: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  cidade: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  cep: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  conjuge: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  dataNascimento: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  dataBatismo: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  cargo: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  dataEntrada: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  dataSaida: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  situacao: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  observacao: string;
}
