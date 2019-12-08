import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/services/Auth.guard";
import { NgModule } from "@angular/core";
import { WishListComponent } from "./wish-list.component";

const routes: Routes = [
  { path: "", component: WishListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class WishListRoutingModule {}
