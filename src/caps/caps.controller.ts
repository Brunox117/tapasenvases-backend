import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CapsService } from './caps.service';
import { CreateCapDto } from './dto/create-cap.dto';
import { UpdateCapDto } from './dto/update-cap.dto';

@Controller('caps')
export class CapsController {
  constructor(private readonly capsService: CapsService) {}

  @Post()
  create(@Body() createCapDto: CreateCapDto) {
    return this.capsService.create(createCapDto);
  }

  @Get()
  findAll() {
    return this.capsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.capsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCapDto: UpdateCapDto) {
    return this.capsService.update(id, updateCapDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.capsService.remove(id);
  }
}
