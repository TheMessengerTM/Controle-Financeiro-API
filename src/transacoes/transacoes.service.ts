import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransacaoDto } from './dto/create-transacao.dto';
import { Transacao } from './schemas/transacao.schema';

@Injectable()
export class TransacoesService {
  constructor(@InjectModel(Transacao.name) private transacaoModel: Model<Transacao>) {}

  async create(dados: CreateTransacaoDto) {
    return this.transacaoModel.create(dados);
  }

  async findAll() {
    const historico = await this.transacaoModel.find();

    const receitas = historico.filter((t) => t.tipo === 'receita');
    const despesas = historico.filter((t) => t.tipo === 'despesa');
    const gastosImpulso = despesas.filter((t) => t.consumoConsciente === false);

    const totalReceitas = receitas.reduce((soma, t) => soma + t.valor, 0);
    const totalDespesas = despesas.reduce((soma, t) => soma + t.valor, 0);
    const totalGastoImpulso = gastosImpulso.reduce((soma, t) => soma + t.valor, 0);

    return {
      historico,
      metricas: {
        saldoTotal: totalReceitas - totalDespesas,
        totalDespesas,
        totalGastoImpulso,
      },
    };
  }
}
