import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { registerDto } from './models/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request, response } from 'express';
import { AuthGuard } from './auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller("api/")
export class AuthController {
    constructor(private userService: UserService,
                private jwtService:JwtService) {}
    
    @Post('register')
    async register (@Body() body : registerDto) {
        const hashed = await bcrypt.hash(body.password, 12)
        return this.userService.create({
            email : body.email,
            password : hashed,
        })
    }

    @Post('login')
    async login (
        @Body('email') email:string,
        @Body('password') pass:string,
        @Res({passthrough: true}) response: Response
    ) {
        const user = await this.userService.findOne({email: email})
        if (!user) {
            throw new NotFoundException('User Not Found');
        }
        if (!await bcrypt.compare(pass, user.password)) {
            throw new BadRequestException('Invalid Credentials')
        }
        const jwt = await this.jwtService.signAsync({id: user.id})
        response.cookie('jwt', jwt,{httpOnly: true})
        return user
    }

    @UseGuards(AuthGuard)
    @Get('whoami')
    async user(@Req() request: Request) {
        console.log("Call whoami")
        const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie)
        console.log(data)
        const u = this.userService.findOne({id: data['id']})
        console.log("User find with whoami !", await u)
        return u
    }

    @Post('logout')
    async logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie('jwt')
        console.log("Removed jwt token cookie !")
        return "Logout successful"
    }
}
