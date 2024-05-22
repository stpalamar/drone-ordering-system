import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { wrap } from '@mikro-orm/postgresql';
import { PublicFile } from '@modules/files/entities/public-file.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from './entities/user.entity';
import { UserDetailsDto } from './types/types';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: EntityRepository<User>,
        @InjectRepository(PublicFile)
        private readonly publicFilesRepository: EntityRepository<PublicFile>,
        private readonly jwtService: JwtService,
        private readonly em: EntityManager,
    ) {}

    async getById(id: number): Promise<User> {
        const user = await this.usersRepository.findOne(
            { id },
            {
                populate: [
                    'role',
                    'role.permissions',
                    'role.permissions.subject',
                    'details',
                    'details.avatar',
                ],
            },
        );
        if (!user) {
            throw new HttpException(
                'User with this id does not exist',
                HttpStatus.NOT_FOUND,
            );
        }
        return user;
    }

    async generateManagerRegistrationUrl(origin: string) {
        const token = this.jwtService.sign({}, { expiresIn: '1h' });

        const url = `${origin}/auth/manager-registration?token=${token}`;

        return {
            url,
        };
    }

    async update(id: number, updateUserDetailsDto: UserDetailsDto) {
        const userToUpdate = await this.getById(id);

        const userAvatar = updateUserDetailsDto.avatar;

        const avatar = await this.publicFilesRepository.findOne({
            id: userAvatar ? userAvatar.id : null,
        });

        wrap(userToUpdate).assign({
            details: {
                ...updateUserDetailsDto,
                avatar: avatar ?? null,
            },
        });

        await this.em.persistAndFlush(userToUpdate);

        return userToUpdate.toObject();
    }

    // create(createUserDto: CreateUserDto) {
    //     return 'This action adds a new user';
    // }
    // findAll() {
    //     return `This action returns all users`;
    // }
    // findOne(id: number) {
    //     return `This action returns a #${id} user`;
    // }
    // update(id: number, updateUserDto: UpdateUserDto) {
    //     return `This action updates a #${id} user`;
    // }
    // remove(id: number) {
    //     return `This action removes a #${id} user`;
    // }
}
