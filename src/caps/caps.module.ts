import { Module } from '@nestjs/common';
import { CapsService } from './caps.service';
import { CapsController } from './caps.controller';
import { Cap } from './entities/cap.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CapsController],
  providers: [CapsService],
  imports: [TypeOrmModule.forFeature([Cap])],
})
export class CapsModule {}
