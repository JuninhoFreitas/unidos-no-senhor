import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateListaDePresencaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  evento_id: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  participante_id: string[];
}
