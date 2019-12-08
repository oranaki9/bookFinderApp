import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BooksFeedComponent } from "./books-feed.component";

xdescribe("BooksFeedComponent", () => {
  let component: BooksFeedComponent;
  let fixture: ComponentFixture<BooksFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BooksFeedComponent]
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
});
