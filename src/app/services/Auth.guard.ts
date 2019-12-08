import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate() {
    const isAuth = this.auth.getIsAuth();
    if (!isAuth) {
      this.router.navigate(["/"]);
      return false;
    }
    return true;
  }
}
