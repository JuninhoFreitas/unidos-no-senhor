import { Injectable } from '@nestjs/common';
import { CreateBibliotecaDto } from './dto/create-biblioteca.dto';
import { UpdateBibliotecaDto } from './dto/update-biblioteca.dto';
import { Biblioteca } from './entities/biblioteca.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BibliotecaService {
  constructor(@InjectRepository(Biblioteca) private readonly bibliotecaRepository: Repository<Biblioteca>) {}
  create(createLivroDto: CreateBibliotecaDto) {
    const livro: Biblioteca = new Biblioteca();
    livro.titulo = createLivroDto.titulo;
    livro.autor = createLivroDto.autor;
    livro.editora = createLivroDto.editora;
    livro.isbn = createLivroDto.isbn;
    livro.anoDeImpressao = createLivroDto.anoDeImpressao;
    livro.observacao = createLivroDto.observacao;
    livro.reservado = createLivroDto.reservado;
    return this.bibliotecaRepository.save(livro);
  }

  findAll(): Promise<Biblioteca[]> {
    return this.bibliotecaRepository.find();
  }

  findOne(id: string): Promise<Biblioteca> {
    return this.bibliotecaRepository.findOneBy({ id });
  }

  update(id: string, updateBibliotecaDto: UpdateBibliotecaDto): Promise<Biblioteca> {
    const livro: Biblioteca = new Biblioteca();
    livro.id = id;
    livro.titulo = updateBibliotecaDto.titulo;
    livro.autor = updateBibliotecaDto.autor;
    livro.editora = updateBibliotecaDto.editora;
    livro.isbn = updateBibliotecaDto.isbn;
    livro.anoDeImpressao = updateBibliotecaDto.anoDeImpressao;
    livro.observacao = updateBibliotecaDto.observacao;
    livro.reservado = updateBibliotecaDto.reservado;
    return this.bibliotecaRepository.save(livro);
  }

  remove(id: string) {
    return this.bibliotecaRepository.delete({ id });
  }
}
