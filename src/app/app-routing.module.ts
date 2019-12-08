import { AuthGuard } from "./services/Auth.guard";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SearchComponent } from "./components/search/search.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "", redirectTo: "welcome", pathMatch: "full" },
  { path: "welcome", component: WelcomeComponent },
  {
    path: "search",
    component: SearchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "wishList",
    loadChildren: () =>
      import("./components/wish-list/wishList.module").then(
        mod => mod.WishListModule
      )
  },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
