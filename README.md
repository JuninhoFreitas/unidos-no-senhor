# API Unidos no Senhor

## Descrição

Este projeto serve como o lado de Servidor do web.unidosnosenhor.com.br.
Ele é construído usando [Nest](https://github.com/nestjs/nest) um framework TypeScript.

## Pré-Requisitos

- [Node + Node Version Manager(Windows)](https://github.com/coreybutler/nvm-windows)
- [Docker(WSL2)](https://docs.docker.com/desktop/wsl/)
- Yarn: `npm install -g yarn`

## Instalação

```bash
$ yarn install
```

## Configuração

### .env

O projeto depende de algumas varíaveis de ambiente, copie o arquivo `.env.development` e renome-o para `.env`, então configure de acordo com seu ambiente.

```bash
# Se for usar a API no docker, alterar o registro DB_HOST do .env para:
DB_HOST=postgresdb
```

### Docker Compose

```bash
# Sobe os serviços
docker compose up -d
```

## Iniciando a aplicaçao

```bash
# Desenvolvimento
$ yarn run start

# Dev + Restart quando salvar
$ yarn run start:dev

# Produção
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Links

- Website - [web.unidosnosenhor.com.br](https://web.unidosnosenhor.com.br)

## Licença

[MIT licensed](LICENSE).
