import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ResultadoDto } from '../dto/resultado.dto';
import { UsuarioCadastrarDto } from './dto/usuario.cadastrar.dto';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './usuario.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUsuarioDto } from './dto/usuario.update.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('usuario')
@ApiTags('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private authService: AuthService,
  ) {}
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Get('listar')
  async listar(): Promise<Usuario[]> {
    return this.usuarioService.listar();
  }

  @Post('cadastrar')
  @HttpCode(201)
  async cadastrar(@Body() data: UsuarioCadastrarDto): Promise<any> {
    const user = await this.usuarioService.findOne(data.email);
    if (user) {
      throw new HttpException('Usuário já cadastrado', HttpStatus.BAD_REQUEST);
    }
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

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: number) {
    const user = this.usuarioService.findOneById(id);
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    this.usuarioService.delete(id);
    return this.authService.delete(user);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post('update')
  @Patch('/:id')
  async updateUsuario(@Param('id') id: number, @Body() data: UpdateUsuarioDto): Promise<ResultadoDto> {
    return this.usuarioService.update(id, data);
  }
}
