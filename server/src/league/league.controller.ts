import { Controller, Get, Param, Delete, Req, Put, Body, Post, UseGuards } from '@nestjs/common';
import { LeagueService } from './league.service';
import { LeagueWidgetDto } from './models/league-widget.dto';
import { Response, Request, response, request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/models/user.entity';


@UseGuards(AuthGuard)
@Controller('api/league')
export class LeagueController {
    constructor(private leagueService: LeagueService,
        private jwtService: JwtService,
        @InjectRepository(User) private readonly userRepository: Repository<User>) { }

    @Get()
    async all() {
        return this.leagueService.all();
    }

    @Post()
    async create(@Body() body: LeagueWidgetDto, @Req() request: Request) {
        const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie)
        console.log("Create a league widget ! Associated with user ", data['id'], " Receive this : ", body)
        return this.leagueService.create({
            title: body.title,
            username: body.username,
            type: body.type,
            refresh: body.refresh,
            user: { id: data['id'] }
        })
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        const u = this.leagueService.findOne({ id })
        if (!u) {
            return ('No user with this id :(')
        }
        return u
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: LeagueWidgetDto
    ) {
        await this.leagueService.update(id, body)
        return this.leagueService.findOne({ id })
    }
    @Get(':id/profile')
    async getProfile(
        @Param('id') id: number,
        @Req() request: Request
    ) {
        const data = await this.leagueService.findOne({ id })
        if (!data)
            return "";
        const reta = await this.leagueService.getProfile(data.username);
        reta['refresh'] = data.refresh
        return reta
    }

    @Get(':id/Rank')
    async getRankone(
        @Param('id') id: number,
        @Req() request: Request
    ) {
        const reta = await this.leagueService.getRank();
        const data = await this.leagueService.findOne({ id })
        if (!data)
            return "";
        reta['refresh'] = data.refresh
        console.log(reta)

        return reta
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.leagueService.delete(id)
    }

}
