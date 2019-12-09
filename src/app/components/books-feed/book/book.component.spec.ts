import { Book } from "./../Book.interface";
import { MatDialog } from "@angular/material";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SummaryPipe } from "./../../../pipes/summary.pipe";
import { Pipe } from "@angular/core";
import { async, ComponentFixture, TestBed, tick } from "@angular/core/testing";

import { BookComponent } from "./book.component";
import { By } from "@angular/platform-browser";

describe("BookComponent", () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  class MockMatDialog {
    open() {}
  }
  const mockBook: Book = {
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
      authors: null,
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
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookComponent, SummaryPipe],
      imports: [HttpClientTestingModule],
      providers: [{ provide: MatDialog, useClass: MockMatDialog }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    component.book = mockBook;

    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  });

  it("should create", () => {
    component.book = mockBook;
    fixture.detectChanges();
    //console.log(component.book);

    expect(component).toBeTruthy();
  });
  it("should display 'test' text in book badge", () => {
    //console.log(component.book);
    const de = fixture.debugElement.query(By.css(".published__date-badge"));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerHTML).toContain("test");
  });
  it("should display 'test' text in book title", () => {
    //console.log(component.book);
    const de = fixture.debugElement.query(By.css(".book__preview-info-title"));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerHTML).toContain("test");
  });
  it("should display 'Not Available' in book authors when ther is no authors return from server", () => {
    //console.log(component.book);
    const de = fixture.debugElement.query(By.css(".authors__name"));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerHTML).toContain("Not Available");
  });
  it("should return img not fount path if the server return empty book img", () => {
    console.log(component.getBookImg());
    const imgNotFoundPath = "assets/book-img-not-fround.jpg";

    component.book.volumeInfo.imageLinks = null;
    const imgSrc = component.getBookImg();

    expect(imgSrc).toContain(imgNotFoundPath);
  });

  it("should display 'test' in the publisher field", () => {
    const de = fixture.debugElement.query(By.css(".book__publisher-text"));
    const el: HTMLElement = de.nativeElement;

    expect(el.innerHTML).toEqual("test");
  });
});
