import { SharedModule } from "./../../shared.module";
import { WishListComponent } from "./wish-list.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WishListRoutingModule } from "./wish-list-routing.module";

@NgModule({
  declarations: [WishListComponent],
  imports: [CommonModule, SharedModule, WishListRoutingModule]
})
export class WishListModule {}
