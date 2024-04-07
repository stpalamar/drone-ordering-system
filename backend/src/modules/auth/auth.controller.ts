import {
    Controller,
    Post,
    Body,
    Res,
    HttpCode,
    UseGuards,
    Req,
    Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
    SignInUserRequestDto,
    SignUpUserRequestDto,
} from '@modules/users/dto/dto';
import { Response, Request } from 'express';
import JwtAuthGuard from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async getMe(@Req() req: Request) {
        return req.user;
    }

    @Post('sign-in')
    async signIn(
        @Body() signInUserRequestDto: SignInUserRequestDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const user = await this.authService.signIn(signInUserRequestDto);
        const cookie = await this.authService.getCookieWithJwtToken(user.id);
        res.setHeader('Set-Cookie', cookie);
        return user;
    }

    @Post('sign-up')
    async signUp(
        @Body() signUpUserRequestDto: SignUpUserRequestDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const user = await this.authService.signUp(signUpUserRequestDto);
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
