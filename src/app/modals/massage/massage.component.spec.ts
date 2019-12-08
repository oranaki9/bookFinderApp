import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MassageComponent } from "./massage.component";
import { By } from "@angular/platform-browser";
import { Router } from "@angular/router";
class MockRouter {
  navigate() {}
}
class MockMatDialog {
  open() {}
}
describe("MassageComponent", () => {
  let component: MassageComponent;
  let fixture: ComponentFixture<MassageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MassageComponent],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: MatDialog, useValue: MockMatDialog },
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { data: { payload: "test" } }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MassageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should display massage", () => {
    const massage = "test";
    component.massage = massage;

    const de = fixture.debugElement.query(By.css(".massage__text"));
    fixture.detectChanges();

    expect((de.nativeElement as HTMLElement).innerHTML).toBe(massage);
  });
});
