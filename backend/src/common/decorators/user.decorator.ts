import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const RequestUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);

export { RequestUser };
