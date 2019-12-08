import { AngularMaterialModule } from "./angular-material.module";
import { BookComponent } from "./components/books-feed/book/book.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SummaryPipe } from "./pipes/summary.pipe";

@NgModule({
  declarations: [BookComponent, SummaryPipe],
  imports: [CommonModule],
  exports: [AngularMaterialModule, BookComponent]
})
export class SharedModule {}
