import { DialogService } from "./../../services/dialog.service";
import { AuthService } from "./../../services/auth.service";
import { BookResult } from "./../books-feed/Book.interface";
import { BooksService } from "./../../services/books.service";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy
} from "@angular/core";
import { PageEvent } from "@angular/material";
import { Book } from "../books-feed/Book.interface";
import { MASSAGE, BOOK_NOT_FOUND } from "src/app/data-structure/data-structure";
import { Subscription } from "rxjs";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {
  userName: string;
  booksList: Book[];
  totalBooks = 20;
  booksPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 4, 5];
  searchText = "";
  isLoading = false;
  booksSub: Subscription;
  bookListSub: Subscription;
  constructor(
    private dialog: DialogService,
    private books: BooksService,
    private auth: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userName = this.auth.getUserName();
    this.bookListSub = this.books.getBooksList().subscribe((books: Book[]) => {
      this.booksList = books;
      this.cd.markForCheck();
    });
  }
  ngOnDestroy() {
    if (this.booksSub) {
      this.booksSub.unsubscribe();
    }
    this.bookListSub.unsubscribe();
  }
  searchBook() {
    if (this.searchText.length !== 0) {
      this.isLoading = true;
      this.booksSub = this.books
        .getBooks(this.booksPerPage, this.currentPage, this.searchText)
        .subscribe((books: BookResult) => {
          this.isLoading = false;
          if (books.totalItems === 0) {
            this.dialog.openDialog(MASSAGE, BOOK_NOT_FOUND);
            return;
          }
          this.books.addToBooksList(books.items);

          this.booksList = books.items;
          this.cd.markForCheck();
        });
    }
  }
  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.booksPerPage = pageData.pageSize;
    this.currentPage = pageData.pageIndex + 1;
    this.booksSub = this.books
      .getBooks(this.booksPerPage, this.currentPage, this.searchText)
      .subscribe((books: BookResult) => {
        this.isLoading = false;
        this.booksList = books.items;
        this.cd.markForCheck();
      });
  }
}
