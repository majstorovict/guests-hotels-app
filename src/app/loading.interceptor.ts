import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from './loading.service';
import { finalize } from "rxjs/operators";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(public ls: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.ls.show();
    const hardcodedToken = '1d38d128-0671-4121-8084-f6332a992a40';
    const reqWithAuth = request.clone  ({
      setHeaders: {
        Authorization: `Bearer ${hardcodedToken}`
      }
    });
    return next.handle(reqWithAuth).pipe(
      finalize(() => this.ls.hide())
    );
  }
}
