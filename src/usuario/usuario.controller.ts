import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ResultadoDto } from '../dto/resultado.dto';
import { UsuarioCadastrarDto } from './dto/usuario.cadastrar.dto';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './usuario.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('usuario')
@ApiTags('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('listar')
  async listar(): Promise<Usuario[]> {
    return this.usuarioService.listar();
  }

  @Post('cadastrar')
  async cadastrar(@Body() data: UsuarioCadastrarDto): Promise<ResultadoDto> {
    return this.usuarioService.cadastrar(data);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('login-token')
  async loginToken(@Request() req, @Body() data) {
    return this.authService.loginToken(data.token);
  }
}
