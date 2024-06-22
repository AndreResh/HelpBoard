import {IsArray, IsNumber, IsString} from 'class-validator';

export class CreateRequestDTO {
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsArray()
    labels: string[];
    @IsNumber()
    latitude: number;
    @IsNumber()
    longitude: number;
}