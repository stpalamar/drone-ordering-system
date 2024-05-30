import fs from 'node:fs';

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
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    Put,
    Query,
    Res,
    UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

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
        @RequestUser() user: User,
    ) {
        return this.ordersService.findAll(query, user);
    }

    @Get(':id')
    @UseGuards(PermissionsGuard)
    @CheckPermissions([PermissionAction.READ, PermissionSubject.ORDER])
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(+id);
    }

    @Get('/generate-pdf/:id')
    @UseGuards(PermissionsGuard)
    @CheckPermissions([PermissionAction.READ, PermissionSubject.ORDER])
    async generatePdf(@Param('id') id: string, @Res() res: Response) {
        try {
            const pdfFilePath = await this.ordersService.generatePdf(+id);
            const filename = pdfFilePath.toUpperCase();
            res.setHeader(
                'Content-disposition',
                `attachment; filename=${filename}`,
            );
            res.setHeader('Content-type', 'application/pdf');

            res.sendFile(pdfFilePath, { root: process.cwd() }, (error) => {
                if (error) {
                    console.error(error);
                }
                fs.unlinkSync(pdfFilePath);
            });
        } catch (error) {
            throw new HttpException(
                'Error while generating pdf',
                HttpStatus.BAD_REQUEST,
            );
        }
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

    @Patch('assign/:id')
    @UseGuards(PermissionsGuard)
    @CheckPermissions([PermissionAction.UPDATE, PermissionSubject.ORDER])
    assignOrder(@Param('id') id: string, @RequestUser() user: User) {
        return this.ordersService.assignOrder(+id, user);
    }

    @Delete(':id')
    @UseGuards(PermissionsGuard)
    @CheckPermissions([PermissionAction.DELETE, PermissionSubject.ORDER])
    remove(@Param('id') id: string) {
        return this.ordersService.softDelete(+id);
    }
}
