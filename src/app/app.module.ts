import { WishListModule } from "./components/wish-list/wishList.module";
import { BooksService } from "./services/books.service";
import { SharedModule } from "./shared.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { SearchComponent } from "./components/search/search.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BooksFeedComponent } from "./components/books-feed/books-feed.component";
import { HttpErrorInteceptor } from "./error.inteceptor";
import { entryComponents } from "./modals/entryComponents";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavBarComponent,
    SearchComponent,
    BooksFeedComponent,
    PageNotFoundComponent,
    entryComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    WishListModule,
    SharedModule
  ],
  entryComponents: [entryComponents],
  providers: [
    BooksService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInteceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
