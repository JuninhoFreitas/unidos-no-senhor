import { Module } from '@nestjs/common';
import { TokenService } from '../token/token.service';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [TokenService],
  providers: [TokenService],
  exports: [RolesGuard],
})
export class GuardModule {}
