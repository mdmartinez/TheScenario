import { Injectable } from '@nestjs/common';
import { DataDao } from './data.dao';
import { Form } from './validation';

@Injectable()
export class AppService {
  constructor(private readonly dataDao: DataDao) {}

  async get(id: string) {
    return this.dataDao.get(id);
  }

  async getAll() {
    return this.dataDao.getAll();
  }

  async create(form: Form) {
    return this.dataDao.create(form);
  }

  async update(id: string, form: Form) {
    return this.dataDao.update(id, form);
  }

  async delete(id: string) {
    return this.dataDao.delete(id);
  }
}
