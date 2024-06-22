import {Controller, Post, Body, UnauthorizedException} from '@nestjs/common';
import {UserService} from './user.service';
import {RegistrationDTO, LoginDTO} from "./userDTO";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post('register')
    async register(@Body() registrationDTO: RegistrationDTO) {
        return this.userService.register(registrationDTO);
    }

    @Post('login')
    async login(
        @Body() loginDTO: LoginDTO
    ) {
        const token = await this.userService.authenticate(loginDTO);
        if (!token) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return {token};
    }
}
