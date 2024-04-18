import { YupValidationPipe } from '@common/pipes/yup-validation.pipe';
import {
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
} from '@modules/users/types/types';
import {
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import JwtAuthGuard from './guards/jwt-auth.guard';
import {
    userSignInValidationSchema,
    userSignUpValidationSchema,
} from './validation-schemas/validation-schemas';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async getMe(@Req() req: Request) {
        return req.user;
    }

    @HttpCode(200)
    @Post('sign-in')
    async signIn(
        @Body(new YupValidationPipe(userSignInValidationSchema))
        userSignInRequestDto: UserSignInRequestDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const user = await this.authService.signIn(userSignInRequestDto);
        const cookie = await this.authService.getCookieWithJwtToken(user.id);
        res.setHeader('Set-Cookie', cookie);
        return user;
    }

    @Post('sign-up')
    async signUp(
        @Body(new YupValidationPipe(userSignUpValidationSchema))
        userSignUpRequestDto: UserSignUpRequestDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const user = await this.authService.signUp(userSignUpRequestDto);
        const cookie = await this.authService.getCookieWithJwtToken(user.id);
        res.setHeader('Set-Cookie', cookie);
        return user;
    }

    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    }
}
