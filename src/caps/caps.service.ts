import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateCapDto } from './dto/create-cap.dto';
import { UpdateCapDto } from './dto/update-cap.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cap } from './entities/cap.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CapsService {
  private readonly logger = new Logger('CapsService');
  constructor(
    @InjectRepository(Cap)
    private readonly capRepository: Repository<Cap>,
  ) {}

  async create(createCapDto: CreateCapDto) {
    try {
      const cap = this.capRepository.create(createCapDto);
      await this.capRepository.save(cap);
      return cap;
    } catch (error) {
      this.logger.error(`[CreateCap] Error: ${error}`);
      this.handleErrors(error);
    }
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

  private handleErrors(error: any): never {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.code === '23505') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(error.detail);
    } else if (error instanceof HttpException) {
      throw error;
    } else {
      throw new InternalServerErrorException(
        'Unknown error please, contact the server admin',
      );
    }
  }
}
