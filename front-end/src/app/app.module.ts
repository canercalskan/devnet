import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './components/pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JoinComponent } from './components/pages/join/join.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { JoinService } from './services/join.service';
import { HttpClientModule } from '@angular/common/http';
import { MainGuard, JoinGuard } from './guards/auth.guard';
import { UserService } from './services/user.service';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { ProfileSidebar } from './components/layouts/profile-sidebar/profile-sidebar.component';
import { PostsComponent } from './components/layouts/posts/posts.component';
@NgModule({
  declarations: [
    AppComponent ,
    HomeComponent,
    JoinComponent,
    FooterComponent , NavbarComponent,
    NotFoundComponent , 
    ProfileComponent , ProfileSidebar,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule, 
    CommonModule ,
    HttpClientModule, 
    JoinService,
    MainGuard, JoinGuard,
    UserService
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
