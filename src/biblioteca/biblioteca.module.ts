import { Module } from '@nestjs/common';
import { BibliotecaService } from './biblioteca.service';
import { BibliotecaController } from './biblioteca.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Biblioteca } from './entities/biblioteca.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Biblioteca])],
  controllers: [BibliotecaController],
  providers: [
    BibliotecaService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class BibliotecaModule {}
