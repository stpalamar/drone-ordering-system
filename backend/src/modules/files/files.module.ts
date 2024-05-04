import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PublicFile } from './entities/public-file.entity';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
    imports: [MikroOrmModule.forFeature([PublicFile]), ConfigModule],
    providers: [FilesService],
    controllers: [FilesController],
})
export class FilesModule {}
