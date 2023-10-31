import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const userAgent = req.get('user-agent');
    const { method, path: url } = req;
    const now = Date.now();

    this.logger.log(
      ` ${method} ${userAgent}: ${url}`,
    );

    this.logger.verbose(` Body:${JSON.stringify(req.body)}`);

    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse();
        const { statusCode } = res;
        this.logger.log(
          ` ${method} ${url} ${statusCode} - ${Date.now() - now}ms`,
        );
      }),
    );
  }
}
