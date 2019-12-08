import { DialogService } from "./../../services/dialog.service";
import { Component, Input } from "@angular/core";
import { Book } from "./Book.interface";
import { BOOK_INFO, IS_FEED } from "src/app/data-structure/data-structure";
@Component({
  selector: "app-books-feed",
  templateUrl: "./books-feed.component.html",
  styleUrls: ["./books-feed.component.scss"]
})
export class BooksFeedComponent {
  @Input() booksList: Book[];
  constructor(private dialog: DialogService) {}

  bookClicked(book: Book) {
    this.dialog.openDialog(BOOK_INFO, { book, mode: IS_FEED });
  }
}
