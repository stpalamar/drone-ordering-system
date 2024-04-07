import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import User from './user.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: EntityRepository<User>,
    ) {}

    async getById(id: number) {
        const user = await this.usersRepository.findOne({ id });
        if (user) {
            return user;
        }
        throw new HttpException(
            'User with this id does not exist',
            HttpStatus.NOT_FOUND,
        );
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
