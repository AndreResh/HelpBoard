import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from './request.entity';
import { User } from '../user/user.entity';

@Injectable()
export class RequestService {
    constructor(
        @InjectRepository(Request)
        private readonly requestRepository: Repository<Request>,
    ) {}

    async createRequest(title: string, description: string, latitude: number, longitude: number, creator: User): Promise<Request> {
        const newRequest = this.requestRepository.create({ title, description, status: 'new', latitude, longitude, creator });
        return this.requestRepository.save(newRequest);
    }

    async getRequestsByUser(userId: number): Promise<Request[]> {
        return this.requestRepository.find({ where: { creator: { id: userId } } });
    }

    async getRequestById(id: number): Promise<Request> {
        return this.requestRepository.findOne({ where: { id } });
    }

    async updateRequest(id: number, updateData: Partial<Request>): Promise<Request> {
        await this.requestRepository.update(id, updateData);
        return this.getRequestById(id);
    }

    async deleteRequest(id: number): Promise<void> {
        await this.requestRepository.delete(id);
    }
    async assignExecutor(requestId: number, executor: User): Promise<Request> {
        const request = await this.getRequestById(requestId);
        request.executor = executor;
        return this.requestRepository.save(request);
    }
}
