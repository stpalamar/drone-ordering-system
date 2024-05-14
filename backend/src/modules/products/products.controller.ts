import { ZodValidationPipe } from '@common/pipes/zod-validation.pipe';
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
import { ProductQueryDto, ProductRequestDto } from './types/types';
import {
    productQueryValidationSchema,
    productValidationSchema,
} from './validation-schemas/validation-schemas';

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
    findAll(
        @Query(new ZodValidationPipe(productQueryValidationSchema))
        query: ProductQueryDto,
    ) {
        return this.productsService.findAll(query);
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
