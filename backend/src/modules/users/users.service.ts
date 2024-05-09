import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: EntityRepository<User>,
        private readonly jwtService: JwtService,
    ) {}

    async getById(id: number) {
        const user = await this.usersRepository.findOne(
            { id },
            {
                populate: [
                    'role',
                    'role.permissions',
                    'role.permissions.subject',
                    'details',
                ],
            },
        );
        if (user) {
            return user.toObject();
        }
        throw new HttpException(
            'User with this id does not exist',
            HttpStatus.NOT_FOUND,
        );
    }

    async generateManagerRegistrationUrl(origin: string) {
        const token = this.jwtService.sign({}, { expiresIn: '1h' });

        const url = `${origin}/auth/manager-registration?token=${token}`;

        return {
            url,
        };
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
