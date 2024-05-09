import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@common/constants/constants';
import { RequestUser } from '@common/decorators/user.decorator';
import { ZodValidationPipe } from '@common/pipes/zod-validation.pipe';
import { PaginationQueryDto } from '@common/types/types';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CheckPermissions } from '@modules/permission/decorators/permissions.decorator';
import {
    PermissionAction,
    PermissionSubject,
} from '@modules/permission/enums/enums';
import { PermissionsGuard } from '@modules/permission/guards/permissions.guard';
import { User } from '@modules/users/entities/user.entity';
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

import { OrdersService } from './orders.service';
import { OrderRequestDto } from './types/types';
import { orderValidationSchema } from './validation-schemas/validation-schemas';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    @UseGuards(PermissionsGuard)
    @CheckPermissions([PermissionAction.CREATE, PermissionSubject.ORDER])
    create(
        @Body()
        createOrderDto: OrderRequestDto,
        @RequestUser() user: User,
    ) {
        return this.ordersService.create(createOrderDto, user);
    }

    @Get()
    @UseGuards(PermissionsGuard)
    @CheckPermissions([PermissionAction.READ, PermissionSubject.ORDER])
    findAll(@Query() pagination: PaginationQueryDto) {
        const { page = DEFAULT_PAGE, limit = DEFAULT_PAGE_SIZE } = pagination;
        return this.ordersService.findAll(+page, +limit);
    }

    @Get(':id')
    @UseGuards(PermissionsGuard)
    @CheckPermissions([PermissionAction.READ, PermissionSubject.ORDER])
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(+id);
    }

    @Put(':id')
    @UseGuards(PermissionsGuard)
    @CheckPermissions([PermissionAction.UPDATE, PermissionSubject.ORDER])
    update(
        @Param('id') id: string,
        @Body(new ZodValidationPipe(orderValidationSchema))
        updateOrderDto: OrderRequestDto,
    ) {
        return this.ordersService.update(+id, updateOrderDto);
    }

    @Delete(':id')
    @UseGuards(PermissionsGuard)
    @CheckPermissions([PermissionAction.DELETE, PermissionSubject.ORDER])
    remove(@Param('id') id: string) {
        return this.ordersService.softDelete(+id);
    }
}
