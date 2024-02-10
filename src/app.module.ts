import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembrosModule } from './membros/membros.module';
import { BibliotecaModule } from './biblioteca/biblioteca.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Biblioteca } from './biblioteca/entities/biblioteca.entity';

@Module({
  imports: [
    MembrosModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'gloriacristo',
      username: 'unidos',
      entities: [__dirname + '/**/**/*.entity.{js,ts}', Biblioteca],
      // entities: [Membro],
      database: 'unidos_db',
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    BibliotecaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
