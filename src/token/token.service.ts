import { Injectable, Inject, HttpException, HttpStatus, forwardRef } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { AuthService } from '../auth/auth.service';
import { Usuario } from '../usuario/entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token) private readonly tokenRepository: Repository<Token>,
    private usuarioService: UsuarioService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async save(hash: string, username: string) {
    const objToken = await this.tokenRepository.findOneBy({ username: username });
    if (objToken) {
      this.tokenRepository.update(objToken.id, {
        hash: hash,
      });
    } else {
      this.tokenRepository.insert({
        hash: hash,
        username: username,
      });
    }
  }

  async refreshToken(oldToken: string) {
    const objToken = await this.tokenRepository.findOneBy({ hash: oldToken });
    if (objToken) {
      const usuario = await this.usuarioService.findOne(objToken.username);
      return this.authService.login(usuario);
    } else {
      //é uma requisição inválida
      return new HttpException(
        {
          errorMessage: 'Token inválido',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async getUsuarioByToken(token: string): Promise<Usuario> {
    token = token.replace('Bearer ', '').trim();
    const objToken: Token = await this.tokenRepository.findOneBy({ hash: token });
    if (objToken) {
      const usuario = await this.usuarioService.findOne(objToken.username);
      return usuario;
    } else {
      //é uma requisição inválida
      return null;
    }
  }
}
