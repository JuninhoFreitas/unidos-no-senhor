import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembrosModule } from './membros/membros.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MembrosModule, MongooseModule.forRoot('mongodb://unidos:gloriacristo@172.22.216.117:27017/')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
