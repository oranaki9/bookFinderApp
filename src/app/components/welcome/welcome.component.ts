import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent implements OnInit {
  userForm: FormGroup;
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.userForm = new FormGroup({
      userName: new FormControl(null, Validators.required)
    });
  }
  get userName() {
    return this.userForm.get("userName");
  }
  logIn() {
    if (this.userForm.valid) {
      this.auth.signUser(this.userName.value);
      this.router.navigate(["/search"]);
    }
  }
}
