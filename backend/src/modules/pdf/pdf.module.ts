import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PublicFile } from '@modules/files/entities/public-file.entity';
import { FilesModule } from '@modules/files/files.module';
import { FilesService } from '@modules/files/files.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PdfService } from './pdf.service';

@Module({
    imports: [
        MikroOrmModule.forFeature([PublicFile]),
        ConfigModule,
        FilesModule,
    ],
    providers: [PdfService, FilesService],
})
export class PdfModule {}
