import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@common/constants/constants';
import { ZodValidationPipe } from '@common/pipes/zod-validation.pipe';
import { PaginationQueryDto } from '@common/types/types';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CheckPermissions } from '@modules/permission/decorators/permissions.decorator';
import {
    PermissionAction,
    PermissionSubject,
} from '@modules/permission/enums/enums';
import { PermissionsGuard } from '@modules/permission/guards/permissions.guard';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { ProductRequestDto } from './types/types';
import { productValidationSchema } from './validation-schemas/validation-schemas';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @UseGuards(PermissionsGuard)
    @CheckPermissions([PermissionAction.CREATE, PermissionSubject.PRODUCT])
    create(
        @Body(new ZodValidationPipe(productValidationSchema))
        createProductDto: ProductRequestDto,
    ) {
        return this.productsService.create(createProductDto);
    }

    @Get()
    @UseGuards(PermissionsGuard)
    @CheckPermissions([PermissionAction.READ, PermissionSubject.PRODUCT])
    findAll(@Query() pagination: PaginationQueryDto) {
        const { page = DEFAULT_PAGE, limit = DEFAULT_PAGE_SIZE } = pagination;
        return this.productsService.findAll(+page, +limit);
    }

    @Get('types')
    @UseGuards(PermissionsGuard)
    @CheckPermissions([PermissionAction.READ, PermissionSubject.PRODUCT])
    findAllTypes() {
        return this.productsService.getUniqueTypes();
    }

    @Get(':id')
    @UseGuards(PermissionsGuard)
    @CheckPermissions([PermissionAction.READ, PermissionSubject.PRODUCT])
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(+id);
    }

    @Put(':id')
    @UseGuards(PermissionsGuard)
    @CheckPermissions([PermissionAction.UPDATE, PermissionSubject.PRODUCT])
    update(
        @Param('id') id: string,
        @Body(new ZodValidationPipe(productValidationSchema))
        updateProductDto: ProductRequestDto,
    ) {
        return this.productsService.update(+id, updateProductDto);
    }

    @Delete(':id')
    @UseGuards(PermissionsGuard)
    @CheckPermissions([PermissionAction.DELETE, PermissionSubject.PRODUCT])
    remove(@Param('id') id: string) {
        return this.productsService.softDelete(+id);
    }
}
