import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './user.entity';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {
    }

    async register(name: string, email: string, password: string): Promise<User> {
        const user = await this.userRepository.findOne({where: {email}});
        if (user) {
            throw new Error("user already exists");
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = this.userRepository.create({name, email, passwordHash, role: 'user'});
        return this.userRepository.save(newUser);
    }

    async authenticate(email: string, password: string): Promise<string> {
        const user = await this.userRepository.findOne({where: {email}});
        if (user && await bcrypt.compare(password, user.passwordHash)) {
            const payload = {email: user.email, sub: user.id, role: user.role};
            return this.jwtService.sign(payload);
        }
        return null;
    }

    async findById(id: number): Promise<User> {
        return this.userRepository.findOne({where: {id}});
    }
}
