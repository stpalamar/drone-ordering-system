import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '@modules/users/user.entity';
import { Global, Module } from '@nestjs/common';

import { CaslAbilityFactory } from './casl-ability.factory';
import { Permission, Role, Subject } from './entities/entities';
import { PermissionsGuard } from './guards/permissions.guard';
import { PermissionService } from './permission.service';

@Global()
@Module({
    imports: [MikroOrmModule.forFeature([User, Role, Permission, Subject])],
    providers: [PermissionService, CaslAbilityFactory, PermissionsGuard],
    exports: [CaslAbilityFactory, PermissionsGuard],
})
export class PermissionModule {}
