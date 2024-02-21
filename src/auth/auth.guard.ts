import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}

function validateRequest(
  request: any,
): boolean | Promise<boolean> | Observable<boolean> {
  const token = request.headers.authorization?.split(' ')[1];
  // Verifique se o token está presente
  if (!token) {
    return false;
  }

  return true;
}
