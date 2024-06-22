import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './user.entity';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {LoginDTO, RegistrationDTO} from "./userDTO";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {
    }

    async register(registrationDTO: RegistrationDTO): Promise<User> {
        const {name, email, password} = registrationDTO
        const user = await this.userRepository.findOne({where: {email}});
        if (user) {
            throw new BadRequestException("user already exists");
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = this.userRepository.create({name, email, passwordHash, role: 'user'});
        return this.userRepository.save(newUser);
    }

    async authenticate(loginDTO: LoginDTO): Promise<string> {
        const { email, password} = loginDTO
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
