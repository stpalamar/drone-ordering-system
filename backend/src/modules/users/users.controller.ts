import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CheckPermissions } from '@modules/permission/decorators/permissions.decorator';
import {
    PermissionAction,
    PermissionSubject,
} from '@modules/permission/enums/enums';
import { PermissionsGuard } from '@modules/permission/guards/permissions.guard';
import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';

import { UserDetailsDto } from './types/types';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Patch(':id')
    @UseGuards(PermissionsGuard)
    @CheckPermissions([PermissionAction.UPDATE, PermissionSubject.USER])
    update(
        @Param('id') id: string,
        @Body() updateUserDetailsDto: UserDetailsDto,
    ) {
        return this.usersService.update(+id, updateUserDetailsDto);
    }
}
