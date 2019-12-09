import { SharedModule } from "./../../shared.module";
import { MatDialog } from "@angular/material";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BooksFeedComponent } from "./books-feed.component";
class MockMatDialog {
  open() {}
}
describe("BooksFeedComponent", () => {
  let component: BooksFeedComponent;
  let fixture: ComponentFixture<BooksFeedComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BooksFeedComponent],
      imports: [SharedModule],
      providers: [{ provide: MatDialog, useClass: MockMatDialog }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should open dialog when book clicked", () => {
    const dialog: MockMatDialog = TestBed.get(MatDialog);
    spyOn(dialog, "open");

    component.bookClicked(null);

    expect(dialog.open).toHaveBeenCalled();
  });
});
