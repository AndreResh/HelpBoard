import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Request as Req } from '@nestjs/common';
import { RequestService } from './request.service';
import { JwtAuthGuard } from '../user/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { Request } from './request.entity';
import {RequestDTO} from "./requestDTO";
import {RequestInvite} from "./request-invite.entity";

@Controller('requests')
export class RequestController {
    constructor(
        private readonly requestService: RequestService,
        private readonly userService: UserService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createRequest(
        @Body() createRequestDTO: RequestDTO,
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
    async updateRequest(@Param('id') id: number, @Body() updateData: RequestDTO) {
        return this.requestService.updateRequest(id, updateData);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteRequest(@Param('id') id: number) {
        await this.requestService.deleteRequest(id);
    }

    @Post(':id/offer-help')
    async offerHelp(@Param('id') id: number, @Body('userId') userId: number): Promise<RequestInvite> {
        return this.requestService.sendInvite(+id, userId);
    }

    @Post('accept-help/:inviteId')
    async acceptHelp(@Param('inviteId') inviteId: number, @Body('userId') userId: number): Promise<Request> {
        return this.requestService.acceptInvite(+inviteId, userId);
    }
    //TODO на заявке видно количество тех кто предлагает помощь, можно либо принять, либо отклонить(отклонение тоже надо сделать)
}
