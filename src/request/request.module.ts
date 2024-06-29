import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './request.entity';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { UserModule } from '../user/user.module';
import {RequestInvite} from "./request-invite.entity";
import {ChatGateway} from "../chat/chat.gateway";
import {EventEmitterModule} from "@nestjs/event-emitter";
import {Message} from "../chat/message.entity";
import {User} from "../user/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Request, User, RequestInvite]), UserModule],
  providers: [RequestService],
  controllers: [RequestController],
})
export class RequestModule {}
