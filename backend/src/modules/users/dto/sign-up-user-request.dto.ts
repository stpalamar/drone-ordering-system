import { PartialType } from '@nestjs/mapped-types';
import { SignInUserRequestDto } from './sign-in-user-request.dto';

export class SignUpUserRequestDto extends PartialType(SignInUserRequestDto) {}
