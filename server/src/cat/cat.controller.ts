import { Controller, Get, Param, Delete, Req, Put, Body, Post, UseGuards, Inject, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatWidgetDto } from './models/cat-widget.dto';
import { Response, Request, response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/models/user.entity';
import { Repository } from 'typeorm';

@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('api/cat')
export class CatController {
    constructor(private catService: CatService,
                private jwtService: JwtService,
                @InjectRepository(User) private readonly userRepository: Repository<User>) { }

    @Get('widget')
    async getCat() {
        return this.catService.getCat();
    }

    @Get()
    async all() {
        return this.catService.all();
    }

    @Post()
    async create(@Body() body: CatWidgetDto, @Req() request: Request) {
        const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie)
        console.log("Create a cat ! Associated with this data ", body)
        return this.catService.create({
            title: body.title,
            type: body.type,
            refresh: body.refresh,
            user: { id: data['id'] }
        })
    }

    @Get(':id/get')
    async getData(@Param('id') id: number) {
        const exist = await this.catService.findOne({id})
        console.log("exist", exist)
        let data = {}
        if (!exist)
            return ""
        data['url'] = (await this.catService.getCat());
        data['refresh'] = (await this.catService.findOne({id})).refresh;
        return data
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        const u = this.catService.findOne({ id })
        if (!u) {
            return ('No cat with this id :(')
        }
        return u
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: CatWidgetDto
    ) {
        await this.catService.update(id, body)
        return this.catService.findOne({ id })
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        //console.log("Deleting : ", id)
        return this.catService.delete(id)
    }
}
