import { Module } from '@nestjs/common';
import { TokenManagerService } from './token-manager.service';
import { TokenService } from '../token/token.service';
import { AuthService } from '../auth/auth.service';
import { TokenModule } from '../token/token.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [TokenModule],
  providers: [TokenManagerService, TokenService, AuthService, JwtStrategy],
  exports: [TokenManagerService],
})
export class TokenManagerModule {}
