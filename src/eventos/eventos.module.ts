import { Module } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../guards/roles.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from './entities/evento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evento])],
  controllers: [EventosController],
  providers: [
    EventosService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [EventosService],
})
export class EventosModule {}
