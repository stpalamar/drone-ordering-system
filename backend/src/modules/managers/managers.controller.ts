import { ZodValidationPipe } from '@common/pipes/zod-validation.pipe';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CheckPermissions } from '@modules/permission/decorators/permissions.decorator';
import {
    PermissionAction,
    PermissionSubject,
} from '@modules/permission/enums/enums';
import { PermissionsGuard } from '@modules/permission/guards/permissions.guard';
import {
    Controller,
    Get,
    Headers,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';

import { ManagersService } from './managers.service';
import { ManagerQueryDto } from './types/types';
import { managerQueryValidationSchema } from './validation-schemas/validation-schemas';

@Controller('managers')
@UseGuards(JwtAuthGuard)
export class ManagersController {
    constructor(private readonly managersService: ManagersService) {}

    @Get()
    @UseGuards(PermissionsGuard)
    @CheckPermissions([PermissionAction.READ, PermissionSubject.MANAGER])
    findAll(
        @Query(new ZodValidationPipe(managerQueryValidationSchema))
        query: ManagerQueryDto,
    ) {
        return this.managersService.findAll(query);
    }

    @Post('registration-url')
    @UseGuards(PermissionsGuard)
    @CheckPermissions([PermissionAction.CREATE, PermissionSubject.MANAGER])
    generateLink(@Headers('origin') host: string) {
        return this.managersService.generateRegistrationUrl(host);
    }

    @Patch(':id/deactivate')
    @UseGuards(PermissionsGuard)
    @CheckPermissions([PermissionAction.DELETE, PermissionSubject.MANAGER])
    deactivate(@Param('id') id: number) {
        return this.managersService.softDelete(id);
    }

    @Patch(':id/activate')
    @UseGuards(PermissionsGuard)
    @CheckPermissions([PermissionAction.CREATE, PermissionSubject.MANAGER])
    activate(@Param('id') id: number) {
        return this.managersService.restore(id);
    }
}
