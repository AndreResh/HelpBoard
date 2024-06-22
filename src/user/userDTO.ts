import {IsString} from 'class-validator';

export class RegistrationDTO {
    @IsString()
    name: string;
    @IsString()
    email: string;
    @IsString()
    password: string;

}

export class LoginDTO {
    @IsString()
    email: string;
    @IsString()
    password: string;
}