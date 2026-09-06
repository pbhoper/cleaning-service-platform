import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from '../enum/user.enum';

interface RequestWithUser {
  user?: {
    role?: {
      name: Role;
    };
  };
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user?.role) {
      throw new ForbiddenException('У вас нет доступа к этому ресурсу');
    }

    const hasRole = requiredRoles.includes(user.role.name);
    if (!hasRole) {
      throw new ForbiddenException('Недостаточно прав для выполнения действия');
    }

    return true;
  }
}
