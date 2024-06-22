import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Request} from './request.entity';
import {User} from '../user/user.entity';
import {getListOfType} from "./label";
import {CreateRequestDTO} from "./requestDTO";

@Injectable()
export class RequestService {
    constructor(
        @InjectRepository(Request)
        private readonly requestRepository: Repository<Request>,
    ) {
    }

    async createRequest(creator: User, createRequestDTO: CreateRequestDTO): Promise<Request> {
        const {title, description,labels, latitude, longitude} = createRequestDTO
        const newRequest = this.requestRepository.create({
            title: title,
            description: description,
            status: 'new',
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
