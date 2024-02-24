import { Module } from '@nestjs/common';
import { ListaDePresencaService } from './lista-de-presenca.service';
import { ListaDePresencaController } from './lista-de-presenca.controller';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../guards/roles.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListaDePresenca } from './entities/lista-de-presenca.entity';
import { Participante } from './entities/participantes.entity';
import { TokenModule } from '../token/token.module';
import { EventosModule } from '../eventos/eventos.module';
import { MembrosModule } from 'src/membros/membros.module';

@Module({
  imports: [TypeOrmModule.forFeature([ListaDePresenca, Participante]), EventosModule, TokenModule, MembrosModule],
  controllers: [ListaDePresencaController],
  providers: [
    ListaDePresencaService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class ListaDePresencaModule {}
