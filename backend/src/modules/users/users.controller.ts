import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import {
    Body,
    Controller,
    Headers,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';

import { UserDetailsDto } from './types/types';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // @Post()
    // create(@Body() createUserDto: CreateUserDto) {
    //     return this.usersService.create(createUserDto);
    // }

    // @Get()
    // findAll() {
    //     return this.usersService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.usersService.findOne(+id);
    // }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateUserDetailsDto: UserDetailsDto,
    ) {
        return this.usersService.update(+id, updateUserDetailsDto);
    }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.usersService.remove(+id);
    // }

    @Post('registration-url')
    generateManagerLink(@Headers('host') host: string) {
        return this.usersService.generateManagerRegistrationUrl(host);
    }
}
