import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { JoinComponent } from './components/pages/join/join.component';
import { MainGuard, JoinGuard } from './guards/auth.guard';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
const routes: Routes = [
  // {path : '' , pathMatch : 'prefix', redirectTo : 'join'},
  {path : '' , component : JoinComponent},
  {path : 'join' , component : JoinComponent , canActivate : [JoinGuard]},
  {path : 'home' , component : HomeComponent , canActivate : [MainGuard]},
  {path : '**' , component : NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
