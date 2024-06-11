import { Body, Controller, Req, Get, Post, ClassSerializerInterceptor, UseInterceptors, UseGuards, Param, Put, Delete, Query } from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt'
import { UserCreateDto } from './models/user-create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserUpdateDto } from './models/user-update.dto';
import { CatService } from 'src/cat/cat.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';


@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('api/users')
export class UserController {
    constructor(private userService: UserService,
                private jwtService: JwtService,) {}

    @Get('')
    async all(@Query('page') page : number = 1) : Promise<User[]>{
        return this.userService.all();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('')
    async create(@Body() body: UserCreateDto): Promise<User> {
        const pass = await bcrypt.hash('1234', 12)
        return this.userService.create({
            first_name: body.first_name,
            last_name: body.first_name,
            email: body.first_name,
            password: pass
        });
    }
    
    @Get('widgets')
    async getWidget(@Req() request: Request) {
        const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie)
        let arr = []
        arr.push(await this.userService.getCatWidget(await this.userService.findOne({id : data['id']})))
        arr.push(await this.userService.getLeagueWidget(await this.userService.findOne({id : data['id']})))
        //console.log("Array", arr)
        return arr
    }

    @Get(':id')
    async get(@Param('id') id : number) {
        const u = this.userService.findOne({id})
        if (!u) {
            return ('No user with this id :(')
        }
        return u
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: UserUpdateDto
    ) {
        await this.userService.update(id, body)
        return this.userService.findOne({id})
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.userService.delete(id)
    }
}
