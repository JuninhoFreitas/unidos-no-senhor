import { Module } from '@nestjs/common';
import { MembrosService } from './membros.service';
import { MembrosController } from './membros.controller';
import { Membro } from './entities/membro.entity';
import { ApiTags } from '@nestjs/swagger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../guards/roles.guard';
import { JwtService } from '@nestjs/jwt';
@ApiTags('membros')
@Module({
  imports: [TypeOrmModule.forFeature([Membro])],
  controllers: [MembrosController],
  providers: [
    MembrosService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [MembrosService],
})
export class MembrosModule {}
