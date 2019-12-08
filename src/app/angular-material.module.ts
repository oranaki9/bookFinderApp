import { BookComponent } from "./components/books-feed/book/book.component";
import { entryComponents } from "./modals/entryComponents";
import { BooksService } from "./services/books.service";
import { MassageComponent } from "./modals/massage/massage.component";
import { NgModule } from "@angular/core";
import {
  MatInputModule,
  MatButtonModule,
  MatPaginatorModule,
  MatDialogModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatSidenavModule
} from "@angular/material";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BookInfoComponent } from "./modals/book-info/book-info.component";

@NgModule({
  exports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule
  ]
})
export class AngularMaterialModule {}
