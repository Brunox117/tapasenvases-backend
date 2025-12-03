import { Module } from '@nestjs/common';
import { CapsService } from './caps.service';
import { CapsController } from './caps.controller';

@Module({
  controllers: [CapsController],
  providers: [CapsService],
})
export class CapsModule {}
