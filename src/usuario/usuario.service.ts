import { Injectable } from '@nestjs/common';
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

  async cadastrar(data: UsuarioCadastrarDto): Promise<ResultadoDto> {
    const usuario = new Usuario();
    usuario.email = data.email;
    usuario.nome = data.nome;
    usuario.password = bcrypt.hashSync(data.senha, 8);
    usuario.telefone = data.telefone;
    usuario.cpf = data.cpf;
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
        return <ResultadoDto>{
          status: false,
          mensagem: 'Houve um errro ao cadastrar o usuário',
        };
      });
  }

  async findOne(email: string): Promise<Usuario | undefined> {
    return this.usuarioRepository.findOneBy({ email: email });
  }
}
