import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MembroDocument = HydratedDocument<Membro>;

@Schema({ versionKey: false })
export class Membro {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  telefone: string;

  @Prop()
  dataNascimento: string;

  @Prop()
  batizado: boolean;

  @Prop()
  dataBatismo: string;

  @Prop()
  cargo: string;

  @Prop()
  dataEntrada: string;

  @Prop()
  dataSaida: string;

  @Prop()
  situacao: string;

  @Prop()
  observacao: string;
}

export const MembroSchema = SchemaFactory.createForClass(Membro);
MembroSchema.set('versionKey', false);
MembroSchema.set('timestamps', true);
MembroSchema.set('toJSON', {
  transform: function (_doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});
