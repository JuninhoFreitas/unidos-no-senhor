import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResultadoDto } from '../dto/resultado.dto';
import { Repository } from 'typeorm';
import { UsuarioCadastrarDto } from './dto/usuario.cadastrar.dto';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsuarioService {
  constructor(@InjectRepository(Usuario) private readonly usuarioRepository: Repository<Usuario>) {}

  async listar(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async cadastrar(data: UsuarioCadastrarDto): Promise<any> {
    const usuario = new Usuario();
    usuario.email = data.email;
    usuario.nome = data.nome;
    usuario.password = bcrypt.hashSync(data.senha, 8);
    usuario.telefone = data.telefone;
    usuario.cpf = data.cpf;
    usuario.roles = data.roles;
    return this.usuarioRepository
      .save(usuario)
      .then((result) => {
        console.log('Usuário cadastrado com sucesso', result);
        return <ResultadoDto>{
          status: true,
          mensagem: 'Usuário cadastrado com sucesso',
        };
      })
      .catch((error) => {
        console.error('Erro ao cadastrar o usuário', error);
        return new HttpException(
          {
            errorMessage: 'Erro ao cadastrar usuário',
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  async findOneById(id: number): Promise<Usuario | undefined> {
    return this.usuarioRepository.findOneBy({ id });
  }

  async findOne(email: string): Promise<Usuario | undefined> {
    return await this.usuarioRepository.findOneBy({ email });
  }

  async delete(id: number) {
    return this.usuarioRepository.delete({ id });
  }

  async update(id: number, data: UsuarioCadastrarDto): Promise<any> {
    const usuario = await this.findOneById(id);
    if (usuario) {
      usuario.email = data.email;
      usuario.nome = data.nome;
      usuario.password = bcrypt.hashSync(data.senha, 8);
      usuario.telefone = data.telefone;
      usuario.cpf = data.cpf;
      usuario.roles = data.roles;
      return this.usuarioRepository
        .save(usuario)
        .then((result) => {
          console.log('Usuário atualizado com sucesso', result);
          return <ResultadoDto>{
            status: true,
            mensagem: 'Usuário atualizado com sucesso',
          };
        })
        .catch((error) => {
          console.error('Erro ao atualizar o usuário', error);
          return new HttpException(
            {
              errorMessage: 'Erro ao atualizar usuário',
            },
            HttpStatus.BAD_REQUEST,
          );
        });
    } else {
      return new HttpException(
        {
          errorMessage: 'Usuário não encontrado',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
