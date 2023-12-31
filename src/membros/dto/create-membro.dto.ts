import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateMembroDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsMobilePhone('pt-BR')
  @ApiProperty()
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
