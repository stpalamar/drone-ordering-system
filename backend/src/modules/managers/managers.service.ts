import { AppRoute } from '@common/enums/enums';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Role } from '@modules/permission/entities/role.entity';
import { User } from '@modules/users/entities/user.entity';
import { UserRole } from '@modules/users/enums/enums';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ManagerQueryDto } from './types/types';

@Injectable()
export class ManagersService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly usersRepository: EntityRepository<User>,
        @InjectRepository(Role)
        private readonly rolesRepository: EntityRepository<Role>,
        private readonly em: EntityManager,
    ) {}

    async findAll(query: ManagerQueryDto) {
        const { page, limit, isActive } = query;

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
                filters: {
                    softDelete: {
                        getOnlyDeleted: !isActive,
                    },
                },
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

    async generateRegistrationUrl(origin: string) {
        const token = this.jwtService.sign(
            {
                isManager: true,
            },
            { expiresIn: '1h' },
        );

        const url = `${origin}${AppRoute.SIGN_UP_MANAGER}?token=${token}`;

        return {
            url,
        };
    }

    async softDelete(id: number) {
        const manager = await this.usersRepository.findOne(id);

        if (!manager) {
            throw new HttpException('Manager not found', HttpStatus.NOT_FOUND);
        }

        manager.deletedAt = new Date();
        this.em.persistAndFlush(manager);
    }

    async restore(id: number) {
        const manager = await this.usersRepository.findOne(id, {
            filters: {
                softDelete: {
                    getOnlyDeleted: true,
                },
            },
        });

        if (!manager) {
            throw new HttpException('Manager not found', HttpStatus.NOT_FOUND);
        }

        manager.deletedAt = null;
        this.em.persistAndFlush(manager);
    }
}
