import { RequestUser } from '@common/decorators/user.decorator';
import { ZodValidationPipe } from '@common/pipes/zod-validation.pipe';
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
    Patch,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';

import { OrdersService } from './orders.service';
import { OrderQueryDto, OrderRequestDto, OrderStatusDto } from './types/types';
import {
    orderQueryValidationSchema,
    orderValidationSchema,
    updateOrderStatusValidationSchema,
} from './validation-schemas/validation-schemas';

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
    findAll(
        @Query(new ZodValidationPipe(orderQueryValidationSchema))
        query: OrderQueryDto,
    ) {
        return this.ordersService.findAll(query);
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

    @Patch('/update-status/:id')
    @UseGuards(PermissionsGuard)
    @CheckPermissions([PermissionAction.UPDATE, PermissionSubject.ORDER])
    updateStatus(
        @Param('id') id: string,
        @Body(new ZodValidationPipe(updateOrderStatusValidationSchema))
        updateOrderStatusDto: OrderStatusDto,
    ) {
        return this.ordersService.updateStatus(+id, updateOrderStatusDto);
    }

    @Delete(':id')
    @UseGuards(PermissionsGuard)
    @CheckPermissions([PermissionAction.DELETE, PermissionSubject.ORDER])
    remove(@Param('id') id: string) {
        return this.ordersService.softDelete(+id);
    }
}
