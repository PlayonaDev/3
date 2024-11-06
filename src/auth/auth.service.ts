import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AuthService {
    @Inject()
    private readonly userService: UserService;

    @Inject()
    private readonly jwtService: JwtService;
    
    async signin(params: Prisma.UserCreateInput): Promise<{acess_token: string}> {
        const user = await this.userService.user({ email: params.email });
        if (!user) throw  new NotFoundException('User not found');
        
        const passwordMatch = await bcrypt.compare(params.password, user.password);
        if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');
        
        const payload = { sub: user.id };
        
        console.log("PAYLOAD --->", payload);
        console.log("USER --->", user);
        console.log("PASSWORDMATCH --->", passwordMatch);
        
        return { acess_token: await this.jwtService.signAsync(payload) };
    
    }
}
