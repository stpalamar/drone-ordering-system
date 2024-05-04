import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CheckPermissions } from '@modules/permission/decorators/permissions.decorator';
import { PermissionAction } from '@modules/permission/enums/enums';
import { PermissionsGuard } from '@modules/permission/guards/permissions.guard';
import {
    Controller,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FilesService } from './files.service';

@Controller('files')
@UseGuards(JwtAuthGuard)
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post('upload')
    @UseGuards(PermissionsGuard)
    @CheckPermissions([PermissionAction.CREATE, 'Files'])
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile() file: Express.Multer.File) {
        return this.filesService.uploadPublicFile(file);
    }
}
