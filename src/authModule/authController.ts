import { Body, Controller, Param, Patch, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { AuthDto, SignInDto, UpdateUserDto } from "./authDto";
import { AuthEntity } from "./authEntity";
import { AuthService } from "./authService";
import { GetUser } from "./getUserDecorator/getUserDecorator";
import { AuthObject } from "./types";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/registerUser')
    async registerUser(
        @Body(ValidationPipe) authDto: AuthDto
    ): Promise<AuthObject>{
        return await this.authService.registerUser(authDto);
    }

    @Post('/registerAdminUser')
    async registerAdminUser(
        @Body(ValidationPipe) authDto: AuthDto
    ): Promise<AuthObject>{
        return await this.authService.registerAdminUser(authDto);
    }

    @Post('/signIn')
    async userSignIn(
        @Body(ValidationPipe) signInDto: SignInDto
    ):Promise<{accessToken: string}> {
        return await this.authService.userSignIn(signInDto);
    }

    @Patch('/updateUser/:authId')
    @UseGuards(AuthGuard())
    async updateUser(@GetUser() user: AuthEntity, @Body() updateUserDto: UpdateUserDto, @Param('authId') authId: string): Promise<AuthEntity> {
        return await this.authService.updateUser(user, updateUserDto, authId)
    }
}