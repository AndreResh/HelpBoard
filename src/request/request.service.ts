import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Request} from './request.entity';
import {User} from '../user/user.entity';
import {getListOfType} from "./label";
import {RequestDTO} from "./requestDTO";
import {RequestInvite} from "./request-invite.entity";
import {EventEmitter2} from "@nestjs/event-emitter";

@Injectable()
export class RequestService {
    constructor(
        @InjectRepository(Request)
        private readonly requestRepository: Repository<Request>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(RequestInvite)
        private requestInviteRepository: Repository<RequestInvite>,
        private eventEmitter: EventEmitter2,
    ) {
    }

    async createRequest(creator: User, createRequestDTO: RequestDTO): Promise<Request> {
        const {title, description, labels, executorsNumber, latitude, longitude} = createRequestDTO
        const newRequest = this.requestRepository.create({
            title: title,
            description: description,
            status: 'new',
            executorsCount: executorsNumber,
            latitude: latitude,
            longitude: longitude,
            creator: creator,
            labels: getListOfType(labels)
        });
        return this.requestRepository.save(newRequest);
    }

    async getRequestsByUser(userId: number): Promise<Request[]> {
        return this.requestRepository.find({where: {creator: {id: userId}}});
    }

    async getRequestById(id: number): Promise<Request> {
        return this.requestRepository.findOne({where: {id}});
    }

    async updateRequest(id: number, updateData: RequestDTO): Promise<Request> {
        await this.requestRepository.update(id, {
            title: updateData.title,
            description: updateData.description,
            executorsCount: updateData.executorsNumber,
            latitude: updateData.latitude,
            longitude: updateData.longitude,
            labels: getListOfType(updateData.labels)
        });
        return this.getRequestById(id);
    }

    async deleteRequest(id: number): Promise<void> {
        await this.requestRepository.delete(id);
    }

    async sendInvite(requestId: number, userId: number): Promise<RequestInvite> {
        const request = await this.requestRepository.findOne({where: {id: requestId}});
        if (!request) {
            throw new NotFoundException('Request not found');
        }

        const user = await this.userRepository.findOne({where: {id: userId}});
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const invite = this.requestInviteRepository.create({
            request,
            user,
        });

        const savedInvite = await this.requestInviteRepository.save(invite);
        this.eventEmitter.emit('invite.created', savedInvite);
        return savedInvite;
    }

    async acceptInvite(inviteId: number, userId: number): Promise<Request> {
        const invite = await this.requestInviteRepository.findOne({where: {id: inviteId}});
        if (!invite) {
            throw new NotFoundException('Invite not found');
        }

        if (invite.user.id !== userId) {
            throw new UnauthorizedException('You are not the invited user');
        }

        invite.status = 'accepted';
        await this.requestInviteRepository.save(invite);

        const request = await this.requestRepository.findOne({where: {id: invite.request.id}});
        request.executors.push(invite.user);
        return this.requestRepository.save(request);
    }

    async rejectInvite(inviteId: number, userId: number): Promise<void> {
        const invite = await this.requestInviteRepository.findOne({where: {id: inviteId}});
        if (!invite) {
            throw new NotFoundException('Invite not found');
        }

        if (invite.user.id !== userId) {
            throw new UnauthorizedException('You are not the invited user');
        }

        invite.status = 'rejected';
        await this.requestInviteRepository.save(invite);
    }

    async getInvitesByStatus(userId: number, status?: 'pending' | 'accepted' | 'rejected'): Promise<RequestInvite[]> {
        const query = this.requestInviteRepository.createQueryBuilder('invite')
            .leftJoinAndSelect('invite.request', 'request')
            .leftJoinAndSelect('invite.user', 'user')
            .where('invite.user.id = :userId', { userId });

        if (status) {
            query.andWhere('invite.status = :status', { status });
        } else {
            query.andWhere('invite.status != :rejected', { rejected: 'rejected' });
        }

        return query.getMany();
    }
}
