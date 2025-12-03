import { Injectable } from '@nestjs/common';
import { CreateCapDto } from './dto/create-cap.dto';
import { UpdateCapDto } from './dto/update-cap.dto';

@Injectable()
export class CapsService {
  create(createCapDto: CreateCapDto) {
    return 'This action adds a new cap';
  }

  findAll() {
    return `This action returns all caps`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cap`;
  }

  update(id: number, updateCapDto: UpdateCapDto) {
    return `This action updates a #${id} cap`;
  }

  remove(id: number) {
    return `This action removes a #${id} cap`;
  }
}
