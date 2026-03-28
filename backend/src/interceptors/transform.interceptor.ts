import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(data => {
                // Convertit les objets Mongoose en plain objects d'abord
                const plain = JSON.parse(JSON.stringify(data));
                return this.transform(plain);
            })
        );
    }

    private transform(data: any): any {
        if (Array.isArray(data)) return data.map(item => this.transform(item));

        if (data && typeof data === 'object') {
            const transformed: any = {};

            for (const key of Object.keys(data)) {
                if (key === 'id') {
                    transformed['_id'] = data[key]?.toString();
                } else if (key === '__v') {
                    // supprime __v
                } else {
                    transformed[key] = this.transform(data[key]);
                }
            }
            return transformed;
        }

        return data;
    }
}