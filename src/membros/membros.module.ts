import { Module } from '@nestjs/common';
import { MembrosService } from './membros.service';
import { MembrosController } from './membros.controller';
import { Membro } from './entities/membro.entity';
import { ApiTags } from '@nestjs/swagger';
import { TypeOrmModule } from '@nestjs/typeorm';
@ApiTags('membros')
@Module({
  imports: [TypeOrmModule.forFeature([Membro])],
  controllers: [MembrosController],
  providers: [MembrosService],
})
export class MembrosModule {}
