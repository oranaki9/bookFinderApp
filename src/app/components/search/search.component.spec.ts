import { By } from "@angular/platform-browser";
import { entryComponents } from "./../../modals/entryComponents";
import { BookResult } from "./../books-feed/Book.interface";
import { SummaryPipe } from "./../../pipes/summary.pipe";
import { BooksFeedComponent } from "./../books-feed/books-feed.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ChangeDetectorRef } from "@angular/core";
import { BooksService } from "./../../services/books.service";
import { AuthService } from "./../../services/auth.service";
import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync
} from "@angular/core/testing";

import { SearchComponent } from "./search.component";
import { DialogService } from "src/app/services/dialog.service";
import { AngularMaterialModule } from "src/app/angular-material.module";
import { BookComponent } from "../books-feed/book/book.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Router } from "@angular/router";
import { of } from "rxjs";

import { MatDialog } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
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
  let bookService: BooksService;
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
        volumeInfo: {
          title: "test",
          allowAnonLogging: false,
          authors: [],
          averageRating: 9,
          canonicalVolumeLink: "test",
          categories: ["test"],
          contentVersion: "test",
          description: "test",
          imageLinks: {
            smallThumbnail: "test",
            thumbnail: "test"
          },
          industryIdentifiers: [{ type: "test", identifier: "test" }],
          infoLink: "test",
          language: "test",
          maturityRating: "test",
          pageCount: 120,
          previewLink: "test",
          printType: "test",
          publishedDate: "test",
          publisher: "test",
          ratingsCount: 9,

          subtitle: "test",
          readingModes: {
            image: true,
            text: true
          }
        }
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
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: MatDialog, useClass: MdDialogMock },
        DialogService,
        AuthService,
        BooksService,
        ChangeDetectorRef,
        AuthService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    dialog = TestBed.get(MatDialog);
    component.searchText = "test";
    bookService = TestBed.get(BooksService);
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display wellcom massage with user name", () => {
    const authService = TestBed.get(AuthService);
    spyOn(authService, "getUserName").and.returnValue("test");
    component.ngOnInit();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css(".welcome__user-text span"));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerHTML).toEqual("test");
  });
  it("should display Books Finder title", () => {
    const de = fixture.debugElement.query(By.css(".books__finder-title"));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerHTML).toContain("Books Finder");
  });

  it("should return books list", () => {
   // const bookService: BooksService = TestBed.get(BooksService);
    spyOn(bookService, "getBooksList").and.returnValue(of(mockBook.items));
    spyOn(bookService, "getBooks").and.returnValue(of(mockBook));
    //component.searchBook();

     component.ngOnInit();
    component.searchText = "test";
    fixture.detectChanges();
    expect(component.booksList.length).toEqual(1);

    component.searchBook();
    fixture.detectChanges();

    console.log(bookService.booksList);
    console.log(component.searchText);

    expect(component.booksList.length).toEqual(1);
  });
  // it("should not return books list if the search input is empty", () => {
  //   const bookService = TestBed.get(BooksService);
  //   spyOn(bookService, "getBooks").and.returnValue(of(mockBook));

  //   component.searchText = "";
  //   component.searchBook();

  //   expect(component.booksList).not.toEqual(mockBook.items);
  //   fixture.destroy();
  // });
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
