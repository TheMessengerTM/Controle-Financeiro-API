# Controle Financeiro API

API feita em NestJS com MongoDB para registrar receitas e despesas (atividade da Aula 7 - Web Mobile).

Projeto extensionista ligado ao ODS 1 e ODS 12.

## Como rodar

1. `npm install`
2. Criar um arquivo `.env` com a variável `MONGODB_URI` (string de conexão do MongoDB Atlas)
3. `npm run start:dev`

## Rotas

- `POST /transacoes` - cadastra uma receita ou despesa
- `GET /transacoes` - retorna o histórico e as métricas (saldoTotal, totalDespesas, totalGastoImpulso)
