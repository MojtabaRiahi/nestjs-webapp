import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core'
import { AuthService } from '../auth/auth.service'
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly authService: AuthService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler())
        if (!roles) {
            return true;
        }
        const request = await context.switchToHttp().getRequest();
        const token = await request.headers['auth-token'];
        const user = await this.authService.validateToken(token);
        request.user=user;
        const hasRole = () => user.role.some(role => roles.includes(role))
        return user && user.role && hasRole();
    }
}

