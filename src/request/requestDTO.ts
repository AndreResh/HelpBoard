import {IsArray, IsNumber, IsString} from 'class-validator';

export class RequestDTO {
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsArray()
    labels: string[];
    @IsNumber()
    executorsNumber: number;
    @IsNumber()
    latitude: number;
    @IsNumber()
    longitude: number;
}