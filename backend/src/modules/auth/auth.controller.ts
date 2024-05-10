import { ZodValidationPipe } from '@common/pipes/zod-validation.pipe';
import { ManagerSignUpRequestDto } from '@modules/managers/types/types';
import { managerSignUpValidationSchema } from '@modules/managers/validation-schemas/validation-schemas';
import { UserRole } from '@modules/users/enums/enums';
import {
    UserConfirmEmailRequestDto,
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
} from '@modules/users/types/types';
import {
    Body,
    Controller,
    Get,
    Headers,
    HttpCode,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
    userConfirmEmailValidationSchema,
    userSignInValidationSchema,
    userSignUpValidationSchema,
} from './validation-schemas/validation-schemas';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async getMe(@Req() req: Request) {
        const user = req.user;
        return user.toObject();
    }

    @HttpCode(200)
    @Post('sign-in')
    async signIn(
        @Body(new ZodValidationPipe(userSignInValidationSchema))
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
        @Body(new ZodValidationPipe(userSignUpValidationSchema))
        userSignUpRequestDto: UserSignUpRequestDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const user = await this.authService.signUp(
            userSignUpRequestDto,
            UserRole.USER,
        );
        const cookie = await this.authService.getCookieWithJwtToken(user.id);
        res.setHeader('Set-Cookie', cookie);
        return user;
    }

    @Post('sign-up-manager')
    async signUpManager(
        @Body(new ZodValidationPipe(managerSignUpValidationSchema))
        managerSignUpRequestDto: ManagerSignUpRequestDto,
        @Headers('origin')
        host: string,
    ) {
        return this.authService.signUpManager(managerSignUpRequestDto, host);
    }

    @Post('confirm-email')
    async confirmEmail(
        @Body(new ZodValidationPipe(userConfirmEmailValidationSchema))
        userConfirmEmailRequestDto: UserConfirmEmailRequestDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const user = await this.authService.confirmEmail(
            userConfirmEmailRequestDto,
        );

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
