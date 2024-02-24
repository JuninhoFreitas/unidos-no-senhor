import { Module, Global } from '@nestjs/common';
import { TokenModule } from './token/token.module';
import { EventosModule } from './eventos/eventos.module';

@Global()
@Module({
  providers: [TokenModule],
  imports: [TokenModule, EventosModule],
})
export class ApiModule {}
