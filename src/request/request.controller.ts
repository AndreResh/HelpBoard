import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Request as Req } from '@nestjs/common';
import { RequestService } from './request.service';
import { JwtAuthGuard } from '../user/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { Request } from './request.entity';
import {CreateRequestDTO} from "./requestDTO";

@Controller('requests')
export class RequestController {
    constructor(
        private readonly requestService: RequestService,
        private readonly userService: UserService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createRequest(
        @Body() createRequestDTO: CreateRequestDTO,
        @Req() req,
    ) {
        const creator = await this.userService.findById(req.user.id);
        return this.requestService.createRequest(creator, createRequestDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getRequestsByUser(@Req() req) {
        return this.requestService.getRequestsByUser(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getRequestById(@Param('id') id: number) {
        return this.requestService.getRequestById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateRequest(@Param('id') id: number, @Body() updateData: Partial<Request>) {
        return this.requestService.updateRequest(id, updateData);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteRequest(@Param('id') id: number) {
        await this.requestService.deleteRequest(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id/assign')
    async assignExecutor(@Param('id') id: number, @Req() req) {
        const executor = await this.userService.findById(req.user.id);
        return this.requestService.assignExecutor(id, executor);
    }
}
