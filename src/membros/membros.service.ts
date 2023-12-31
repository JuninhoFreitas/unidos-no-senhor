import { Injectable } from '@nestjs/common';
import { CreateMembroDto } from './dto/create-membro.dto';
import { UpdateMembroDto } from './dto/update-membro.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Membro } from './membros.schema';
import { Model } from 'mongoose';

@Injectable()
export class MembrosService {
  constructor(@InjectModel(Membro.name) private membroModel: Model<Membro>) {}

  async create(createMembroDto: CreateMembroDto): Promise<Membro> {
    const createdMembro = new this.membroModel(createMembroDto);
    return createdMembro.save();
  }

  async findAll(): Promise<Membro[]> {
    return this.membroModel.find().exec();
  }

  findOne(id: string): Promise<Membro> {
    return this.membroModel.findById(id).exec();
  }

  update(id: string, updateMembroDto: UpdateMembroDto): Promise<Membro> {
    return this.membroModel.findOneAndUpdate({ _id: id }, updateMembroDto).exec();
  }

  remove(id: string) {
    return this.membroModel.deleteOne({ _id: id }).exec();
  }
}
