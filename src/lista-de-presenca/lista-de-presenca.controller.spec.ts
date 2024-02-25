import { Test, TestingModule } from '@nestjs/testing';
import { ListaDePresencaController } from './lista-de-presenca.controller';
import { ListaDePresencaService } from './lista-de-presenca.service';

describe('EventosController', () => {
  let controller: ListaDePresencaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListaDePresencaController],
      providers: [ListaDePresencaService],
    }).compile();

    controller = module.get<ListaDePresencaController>(ListaDePresencaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
