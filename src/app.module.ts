import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembrosModule } from './membros/membros.module';
import { BibliotecaModule } from './biblioteca/biblioteca.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Biblioteca } from './biblioteca/entities/biblioteca.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MembrosModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 5432,
      password: process.env.DB_PASSWORD || 'gloriacristo',
      username: process.env.DB_USER || 'unidos',
      entities: [__dirname + '/**/**/*.entity.{js,ts}', Biblioteca],
      // entities: [Membro],
      database: process.env.DB_DATABASE || 'unidos_db',
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    BibliotecaModule,
    // UsuarioModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
