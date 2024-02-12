import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../token/token.service';

@Injectable()
export class TokenManagerService {
  constructor(
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async generateToken(payload: any): Promise<string> {
    const token = this.jwtService.sign(payload);
    this.tokenService.save(token, payload.email);
    return token;
  }

  async validateToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }

  async refreshToken(oldToken: string) {
    return this.tokenService.refreshToken(oldToken);
  }

  async getUsuarioByToken(token: string) {
    return this.tokenService.getUsuarioByToken(token);
  }
}
