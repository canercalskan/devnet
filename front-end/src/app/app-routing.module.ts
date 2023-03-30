import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { JoinComponent } from './components/pages/join/join.component';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {path : '' , pathMatch : 'prefix', redirectTo : 'join'},
  {path : 'join' , component : JoinComponent},
  {path : 'home' , component : HomeComponent , canActivate : [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
