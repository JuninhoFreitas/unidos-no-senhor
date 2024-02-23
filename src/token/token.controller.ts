import { Body, Controller, Get, Headers, HttpStatus, Put, Res, UseGuards } from '@nestjs/common';
import { RefreshTokenDto } from './dto/refresh.token.dto';
import { TokenService } from './token.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Response } from 'express';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Put('refresh')
  async refreshToken(@Body() data: RefreshTokenDto) {
    return this.tokenService.refreshToken(data.oldToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('roles')
  async getRoles(@Headers() headers: { authorization: string }, @Res() res: Response): Promise<string[] | void> {
    const roles = await this.tokenService.getRoles(headers.authorization);
    if (roles != null) {
      res.status(HttpStatus.OK).send(roles);
    } else {
      res.status(HttpStatus.NO_CONTENT).send();
    }
  }
}
