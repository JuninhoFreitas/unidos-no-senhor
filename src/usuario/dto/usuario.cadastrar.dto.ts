import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UsuarioCadastrarDto {
  @IsString()
  @ApiProperty()
  @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  senha: string;

  @IsString()
  @ApiProperty()
  @IsMobilePhone('pt-BR')
  telefone: string;

  @IsOptional()
  @ApiProperty()
  cpf: string;
}
