import { Module, Global } from '@nestjs/common';
import { TokenModule } from './token/token.module';

@Global()
@Module({
  providers: [TokenModule],
  imports: [TokenModule],
})
export class ApiModule {}
