import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateListaDePresencaDto } from './create-lista-de-presenca.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateListaDePresencaDto extends PartialType(CreateListaDePresencaDto) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  evento_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  participante_id: string[];
}
