import { Injectable } from '@nestjs/common';

@Injectable()
export class DataSetService {
  create(createDataSetDto) {
    return 'This action adds a new dataSet';
  }

  findAll() {
    return `This action returns all dataSet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dataSet`;
  }

  update(id: number, updateDataSetDto) {
    return `This action updates a #${id} dataSet`;
  }

  remove(id: number) {
    return `This action removes a #${id} dataSet`;
  }
}
