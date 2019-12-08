import { Book } from "./../Book.interface";
import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { BooksService } from "../../../services/books.service";

@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent {
  @Input() book: Book;
  constructor(private books: BooksService) {}

  getBookImg() {
    const bookNotFoundPath = "assets/book-img-not-fround.jpg";
    return this.book.volumeInfo.imageLinks
      ? this.book.volumeInfo.imageLinks.smallThumbnail
      : bookNotFoundPath;
  }
}
