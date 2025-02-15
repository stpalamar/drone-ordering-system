import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { CaslAbilityFactory } from '../casl-ability.factory';
import { PERMISSION_CHECKER_KEY } from '../decorators/permissions.decorator';
import { AppAbility, RequiredPermission } from '../types/types';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private abilityFactory: CaslAbilityFactory,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredPermissions =
            this.reflector.get<RequiredPermission[]>(
                PERMISSION_CHECKER_KEY,
                context.getHandler(),
            ) || [];
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        const ability = await this.abilityFactory.createForUser(user);
        return requiredPermissions.every((permission) =>
            this.isAllowed(ability, permission),
        );
    }
    private isAllowed(
        ability: AppAbility,
        permission: RequiredPermission,
    ): boolean {
        return ability.can(...permission);
    }
}
