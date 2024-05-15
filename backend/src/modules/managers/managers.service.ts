import { AppRoute } from '@common/enums/enums';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Role } from '@modules/permission/entities/role.entity';
import { User } from '@modules/users/entities/user.entity';
import { UserRole } from '@modules/users/enums/enums';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ManagersService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly usersRepository: EntityRepository<User>,
        @InjectRepository(Role)
        private readonly rolesRepository: EntityRepository<Role>,
    ) {}

    async findAll(page: number, limit: number) {
        if (page < 1 || limit < 1) {
            throw new HttpException(
                'Invalid query parameters',
                HttpStatus.BAD_REQUEST,
            );
        }

        const role = await this.rolesRepository.findOne({
            name: UserRole.MANAGER,
        });
        const [managers, count] = await this.usersRepository.findAndCount(
            {
                role,
            },
            {
                populate: [
                    'role',
                    'role.permissions',
                    'role.permissions.subject',
                    'details',
                ],
                limit,
                offset: (page - 1) * limit,
                orderBy: { id: 'ASC' },
            },
        );

        return {
            items: managers.map((manager) => manager.toObject()),
            page: page ?? 1,
            perPage: limit ?? count,
            total: count,
            totalPages: Math.ceil(count / (limit ?? count)),
        };
    }
    // findOne(id: number) {
    //   return `This action returns a #${id} manager`;
    // }
    // update(id: number, updateManagerDto: UpdateManagerDto) {
    //   return `This action updates a #${id} manager`;
    // }
    // remove(id: number) {
    //   return `This action removes a #${id} manager`;
    // }
    async generateRegistrationUrl(origin: string) {
        const token = this.jwtService.sign({}, { expiresIn: '1h' });

        const url = `${origin}${AppRoute.SIGN_UP_MANAGER}?token=${token}`;

        return {
            url,
        };
    }
}
