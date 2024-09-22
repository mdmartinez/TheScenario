import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Data } from './data.db';
import { Form } from './validation';

@Injectable()
export class DataDao {
  constructor(
    @InjectModel(Data.name, 'local') private dataModel: Model<Data>,
  ) {}

  async get(id: string): Promise<Data[]> {
    return this.dataModel.findById(id);
  }

  async getAll(): Promise<Data[]> {
    return this.dataModel.find();
  }

  async create(form: Form): Promise<Data> {
    const createdData = new this.dataModel({ ...form });
    return createdData.save();
  }

  async update(id: string, form: Form): Promise<Data> {
    return this.dataModel.findByIdAndUpdate(id, form, { new: true });
  }

  async delete(id: string) {
    await this.dataModel.deleteOne({ _id: id });
  }
}
