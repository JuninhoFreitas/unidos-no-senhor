import { PartialType } from '@nestjs/mapped-types';
import { UsuarioCadastrarDto } from './usuario.cadastrar.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsMobilePhone, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUsuarioDto extends PartialType(UsuarioCadastrarDto) {
  @IsString()
  @ApiProperty()
  @IsOptional()
  @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
  nome: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  senha: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  @IsMobilePhone('pt-BR')
  telefone: string;

  @IsOptional()
  @ApiProperty()
  cpf: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  roles: string[];
}
