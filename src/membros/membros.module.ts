import { Module } from '@nestjs/common';
import { MembrosService } from './membros.service';
import { MembrosController } from './membros.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Membro, MembroSchema } from './membros.schema';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('membros')
@Module({
  imports: [MongooseModule.forFeature([{ name: Membro.name, schema: MembroSchema }])],
  controllers: [MembrosController],
  providers: [MembrosService],
})
export class MembrosModule {}
