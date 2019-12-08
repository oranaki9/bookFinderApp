import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  currentUserName: string;
  isAuth = false;

  constructor(private router: Router) {}
  signUser(user: string): void {
    this.currentUserName = user;
    this.isAuth = true;
  }
  getUserName(): string {
    return this.currentUserName;
  }

  getIsAuth(): boolean {
    return this.isAuth;
  }
  logOut(): void {
    this.currentUserName = "";
    this.isAuth = false;
    this.router.navigate(["/"]);
  }
}
