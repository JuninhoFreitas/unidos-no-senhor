import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString, IsUUID } from 'class-validator';

export class FindAllListaDePresencaQueryParams {
  @ApiProperty({ default: 50 })
  @IsNumberString()
  @IsOptional()
  limit: number;

  @ApiProperty({ default: 0 })
  @IsNumberString()
  @IsOptional()
  offset: number;

  @ApiProperty({ default: null })
  @IsString()
  @IsUUID(4)
  @IsOptional()
  evento_id: string;

  @ApiProperty({ default: null })
  @IsString()
  @IsUUID(4)
  @IsOptional()
  participante_id: string;

  @ApiProperty({ default: null })
  @IsNumberString()
  @IsOptional()
  responsavel_id: number;
}

export class FindAllParticipantesQueryParams {
  @ApiProperty({ default: 50 })
  @IsNumberString()
  @IsOptional()
  limit: number;

  @ApiProperty({ default: 0 })
  @IsNumberString()
  @IsOptional()
  offset: number;

  @ApiProperty({ default: null })
  @IsString()
  @IsOptional()
  nome: string;
}
