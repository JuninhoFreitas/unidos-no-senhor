import { Body, Controller, Get, Headers, Put, UseGuards } from '@nestjs/common';
import { RefreshTokenDto } from './dto/refresh.token.dto';
import { TokenService } from './token.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Put('refresh')
  async refreshToken(@Body() data: RefreshTokenDto) {
    return this.tokenService.refreshToken(data.oldToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('roles')
  async getRoles(@Headers() headers: { authorization: string }): Promise<string[]> {
    return this.tokenService.getRoles(headers.authorization);
  }
}
