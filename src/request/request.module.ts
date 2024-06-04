import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './request.entity';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Request]), UserModule],
  providers: [RequestService],
  controllers: [RequestController],
})
export class RequestModule {}
