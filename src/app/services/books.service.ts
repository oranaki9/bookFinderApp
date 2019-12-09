import {
  MASSAGE,
  ADDED_TO_WISH,
  ALREDY_IN_WISH
} from "src/app/data-structure/data-structure";
import { DialogService } from "./dialog.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Book, BookResult } from "../components/books-feed/Book.interface";

@Injectable({
  providedIn: "root"
})
export class BooksService {
  BASE_URL = "https://www.googleapis.com/books/v1/volumes";
  wishListListener: BehaviorSubject<Book[]> = new BehaviorSubject([]);
  booksListener: BehaviorSubject<Book[]> = new BehaviorSubject([]);
  bookNameListener: BehaviorSubject<string> = new BehaviorSubject("");
  paginationInfoListener: BehaviorSubject<{
    currentPage: number;
    bookPerPage: number;
  }> = new BehaviorSubject<{ currentPage: number; bookPerPage: number }>({
    currentPage: 1,
    bookPerPage: 5
  });
  bookName: string;
  wishList: Book[] = [];
  booksList: Book[] = [];
  constructor(private http: HttpClient, private dialog: DialogService) {}

  addBookName(bookName: string) {
    this.bookName = bookName;
    this.bookNameListener.next(this.bookName);
  }
  getBookName() {
    return this.bookNameListener.asObservable();
  }
  getBooks(
    booksPerPage: number,
    currentPage: number,
    searchText: string
  ): Observable<BookResult> {
    const page = currentPage * booksPerPage;
    let params: HttpParams = new HttpParams();
    params = params.append("q", searchText);
    params = params.append("startIndex", page.toString());
    params = params.append("maxResults", booksPerPage.toString());
    return this.http.get<BookResult>(this.BASE_URL, { params });
  }
  addToBooksList(books: Book[]) {
    this.booksList = books;
    this.booksListener.next([...this.booksList]);
  }
  getBooksList() {
    return this.booksListener.asObservable();
  }
  addPaginationInfo(currentPage: number, bookPerPage: number) {
    const paginationInfo = { currentPage, bookPerPage };
    this.paginationInfoListener.next(paginationInfo);
  }
  getPaginationInfo() {
    return this.paginationInfoListener.asObservable();
  }
  addToWishList(bookId: Book): void {
    const isInWish = this.wishList.find(b => b.id === bookId.id) ? true : false;
    if (!isInWish) {
      this.wishList.push(bookId);
      this.wishListListener.next([...this.wishList]);
      this.dialog.openDialog(MASSAGE, ADDED_TO_WISH);
    } else {
      this.dialog.openDialog(MASSAGE, ALREDY_IN_WISH);
    }
  }
  removeFromWishList(bookId: string): void {
    const newWishList = this.wishList.filter(w => w.id !== bookId);
    this.wishList = newWishList;
    this.wishListListener.next([...this.wishList]);
    this.dialog.close();
  }
  getWishList(): Observable<Book[]> {
    return this.wishListListener.asObservable();
  }
}
