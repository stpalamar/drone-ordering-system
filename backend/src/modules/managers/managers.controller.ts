import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@common/constants/constants';
import { PaginationQueryDto } from '@common/types/types';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import {
    Controller,
    Get,
    Headers,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';

import { ManagersService } from './managers.service';

@Controller('managers')
@UseGuards(JwtAuthGuard)
export class ManagersController {
    constructor(private readonly managersService: ManagersService) {}

    // @Post()
    // create(@Body() createManagerDto: CreateManagerDto) {
    //   return this.managersService.create(createManagerDto);
    // }

    @Get()
    findAll(@Query() pagination: PaginationQueryDto) {
        const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = pagination;
        return this.managersService.findAll(+page, +limit);
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //   return this.managersService.findOne(+id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    //   return this.managersService.update(+id, updateManagerDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.managersService.remove(+id);
    // }

    @Post('registration-url')
    generateLink(@Headers('origin') host: string) {
        return this.managersService.generateRegistrationUrl(host);
    }
}
