import { BOOK_INFO, IS_WISH } from "./../../data-structure/data-structure";
import { DialogService } from "./../../services/dialog.service";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy
} from "@angular/core";
import { BooksService } from "src/app/services/books.service";
import { Book } from "../books-feed/Book.interface";
import { Subscription } from "rxjs";

@Component({
  selector: "app-wish-list",
  templateUrl: "./wish-list.component.html",
  styleUrls: ["./wish-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WishListComponent implements OnInit, OnDestroy {
  booksWishList: Book[];
  booksWishListSub: Subscription;
  constructor(
    private books: BooksService,
    private dialog: DialogService,
    private cd: ChangeDetectorRef
  ) {}
  ngOnDestroy() {
    this.booksWishListSub.unsubscribe();
  }
  ngOnInit() {
    this.booksWishListSub = this.books
      .getWishList()
      .subscribe((wishList: Book[]) => {
        this.booksWishList = [...wishList];
        this.cd.markForCheck();
      });
  }
  bookClicked(book: Book) {
    this.dialog.openDialog(BOOK_INFO, { book, mode: IS_WISH });
  }
}
