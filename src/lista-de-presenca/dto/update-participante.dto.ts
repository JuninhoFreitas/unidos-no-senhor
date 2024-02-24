import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateParticipantesDto } from './create-participante.dto';

export class UpdateParticipantesDto extends PartialType(CreateParticipantesDto) {
  @ApiProperty()
  @IsString()
  @IsOptional()
  nome: string;

  @ApiProperty()
  @IsString()
  @IsUUID(4)
  @IsOptional()
  membro_id: string;
}
