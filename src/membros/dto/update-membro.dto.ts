import { PartialType } from '@nestjs/mapped-types';
import { CreateMembroDto } from './create-membro.dto';
import { IsDateString, IsEmail, IsMobilePhone, IsOptional, IsString, Matches } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMembroDto extends PartialType(CreateMembroDto) {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  nome: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional()
  email: string;

  @IsOptional()
  @IsString()
  @IsMobilePhone('pt-BR')
  @ApiPropertyOptional()
  telefone: string;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional()
  dataNascimento: Date;

  @IsOptional()
  @Matches(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/, { message: 'CPF inválido' })
  @ApiPropertyOptional()
  cpf: string;

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
