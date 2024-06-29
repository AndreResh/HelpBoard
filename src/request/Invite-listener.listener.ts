import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RequestInvite } from './request-invite.entity';

@Injectable()
export class InviteListener {
    @OnEvent('invite.created')
    handleInviteCreatedEvent(invite: RequestInvite) {
        // TODO отправка на почту и в сообщения
        console.log(`Invite created for user ${invite.user.id} to request ${invite.request.id}`);
    }
}
