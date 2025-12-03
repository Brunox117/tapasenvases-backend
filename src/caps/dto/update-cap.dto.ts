import { PartialType } from '@nestjs/mapped-types';
import { CreateCapDto } from './create-cap.dto';

export class UpdateCapDto extends PartialType(CreateCapDto) {}
