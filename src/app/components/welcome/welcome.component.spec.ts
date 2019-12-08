import { AuthService } from "./../../services/auth.service";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "./../../angular-material.module";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { WelcomeComponent } from "./welcome.component";
import { Router } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("WelcomeComponent", () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  class MockRouter {
    navigate() {}
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
      imports: [
        BrowserAnimationsModule,
        AngularMaterialModule,
        ReactiveFormsModule
      ],
      providers: [{ provide: Router, useClass: MockRouter }, AuthService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("form should contain userName", () => {
    expect(component.userForm.contains("userName")).toBeTruthy();
  });
  it("should return form userName", () => {
    const user = "test";

    component.userForm.get("userName").setValue("test");

    expect(component.userName.value).toBe(user);
  });
  it("user name should be required", () => {
    component.userForm.get("userName").setValue("");

    expect(component.userForm.valid).not.toBeTruthy();
  });
  it("user name should be saved is Auth Service", () => {
    const user = "test";
    component.userForm.get("userName").setValue(user);
    const authService = TestBed.get(AuthService);

    component.logIn();

    expect(authService.currentUserName).toBe(user);
  });
});
