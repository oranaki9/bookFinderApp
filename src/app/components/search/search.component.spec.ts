import { entryComponents } from "./../../modals/entryComponents";
import { BookResult } from "./../books-feed/Book.interface";
import { SummaryPipe } from "./../../pipes/summary.pipe";
import { BooksFeedComponent } from "./../books-feed/books-feed.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ChangeDetectorRef } from "@angular/core";
import { BooksService } from "./../../services/books.service";
import { AuthService } from "./../../services/auth.service";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchComponent } from "./search.component";
import { DialogService } from "src/app/services/dialog.service";
import { AngularMaterialModule } from "src/app/angular-material.module";
import { BookComponent } from "../books-feed/book/book.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Router } from "@angular/router";
import { of } from "rxjs";

import { MatDialog } from "@angular/material";
class MockRouter {
  navigate() {}
}
export class MdDialogMock {
  open() {}
}
describe("SearchComponent", () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let dialog: MdDialogMock;

  const mockBook: BookResult = {
    kind: null,
    totalItems: 20,
    items: [
      {
        accessInfo: "test",
        etag: "test",
        kind: "test",
        salseInfo: "test",
        searchInfo: "test",
        id: "test",
        selfLink: "test",
        volumeInfo: null
      }
    ]
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchComponent,
        BooksFeedComponent,
        BookComponent,
        SummaryPipe,
        entryComponents
      ],
      imports: [
        AngularMaterialModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: MatDialog, useClass: MdDialogMock },
        DialogService,
        AuthService,
        BooksService,
        ChangeDetectorRef
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    dialog = TestBed.get(MatDialog);

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should return books list", () => {
    const bookService = TestBed.get(BooksService);
    spyOn(bookService, "getBooks").and.returnValue(of(mockBook));

    component.searchText = "test";
    component.searchBook();

    expect(component.booksList).toBe(mockBook.items);
  });
  it("should not return books list if the search input is empty", () => {
    const bookService = TestBed.get(BooksService);
    spyOn(bookService, "getBooks").and.returnValue(of(mockBook));

    component.searchText = "";
    component.searchBook();

    expect(component.booksList).not.toBe(mockBook.items);
  });
  it("should display massage if the search result comes empty.", () => {
    const bookService = TestBed.get(BooksService);
    mockBook.totalItems = 0; // the sign for the search result comes empty.
    spyOn(bookService, "getBooks").and.returnValue(of(mockBook));
    spyOn(dialog, "open");

    component.searchText = "test";
    component.searchBook();

    expect(dialog.open).toHaveBeenCalled();
  });
});
