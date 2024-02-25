import { Test, TestingModule } from '@nestjs/testing';
import { ListaDePresencaService } from './lista-de-presenca.service';

describe('EventosService', () => {
  let service: ListaDePresencaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListaDePresencaService],
    }).compile();

    service = module.get<ListaDePresencaService>(ListaDePresencaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
