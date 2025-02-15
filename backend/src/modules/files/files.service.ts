import { randomUUID } from 'node:crypto';

import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

import { PublicFile } from './entities/public-file.entity';

@Injectable()
export class FilesService {
    private readonly s3: S3;

    constructor(
        @InjectRepository(PublicFile)
        private readonly publicFilesRepository: EntityRepository<PublicFile>,
        private readonly em: EntityManager,
        private readonly configService: ConfigService,
    ) {
        this.s3 = new S3({
            accessKeyId: this.configService.get('S3_ACCESS_KEY'),
            secretAccessKey: this.configService.get('S3_SECRET_KEY'),
            region: this.configService.get('S3_REGION'),
        });
    }

    async uploadPublicFile(file: Express.Multer.File) {
        const uploadResult = await this.s3
            .upload({
                Bucket: this.configService.get('S3_BUCKET_NAME'),
                Body: file.buffer,
                Key: randomUUID(),
                ContentType: file.mimetype,
                ACL: 'public-read',
            })
            .promise();

        const newFile = this.publicFilesRepository.create(
            {
                key: uploadResult.Key,
                url: uploadResult.Location,
            },
            { persist: true },
        );

        await this.em.persistAndFlush(newFile);
        return newFile.toObject();
    }

    async getPublicFileBuffer(publicFile: PublicFile) {
        const file = await this.s3
            .getObject({
                Bucket: this.configService.get('S3_BUCKET_NAME'),
                Key: publicFile.key,
            })
            .promise();

        return file.Body as Buffer;
    }
}
