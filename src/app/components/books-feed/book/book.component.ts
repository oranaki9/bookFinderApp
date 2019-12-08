import { Book } from "./../Book.interface";
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";
import { BooksService } from "src/app/services/books.service";

@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent implements OnInit {
  @Input() book: Book;
  // @Output() bookClicked: EventEmitter<Book> = new EventEmitter<Book>();
  constructor(private books: BooksService) {}

  ngOnInit() {}
  getBookImg() {
    const bookNotFoundPath = "../../../../assets/book-img-not-fround.jpg";
    return this.book.volumeInfo.imageLinks
      ? this.book.volumeInfo.imageLinks.smallThumbnail
      : bookNotFoundPath;
  }
  // onBookClicked(book: Book) {
  //   this.bookClicked.emit(book);
  //   // this.books.openBookInfoDialiog(book);
  // }
}
