import { MASSAGE, SERVER_ERROR } from "src/app/data-structure/data-structure";
import { DialogService } from "./services/dialog.service";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
@Injectable()
export class HttpErrorInteceptor implements HttpInterceptor {
  constructor(private dialog: DialogService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMassage =
          `${SERVER_ERROR}: ${error.message}` || SERVER_ERROR;
        this.dialog.openDialog(MASSAGE, errorMassage);
        return throwError(error);
      })
    );
  }
}
