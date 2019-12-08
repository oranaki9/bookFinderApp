import { Book } from "./../../components/books-feed/Book.interface";
import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy
} from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { BooksService } from "src/app/services/books.service";

@Component({
  selector: "app-book-info",
  templateUrl: "./book-info.component.html",
  styleUrls: ["./book-info.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookInfoComponent implements OnInit {
  mode: string;
  book: Book;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { payload: { book: Book; mode: string } },
    private books: BooksService
  ) {
    this.book = data.payload.book;
  }
  addToWishList() {
    this.books.addToWishList(this.data.payload.book);
  }
  removeFromWishList() {
    this.books.removeFromWishList(this.data.payload.book.id);
  }
  getBookImg() {
    const bookNotFoundPath = "../../../../assets/book-img-not-fround.jpg";
    return this.book.volumeInfo.imageLinks
      ? this.book.volumeInfo.imageLinks.smallThumbnail
      : bookNotFoundPath;
  }

  ngOnInit() {
    this.mode = this.data.payload.mode;
  }
}
