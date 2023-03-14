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
@NgModule({
  declarations: [
    AppComponent ,
    HomeComponent,
    JoinComponent,
    FooterComponent , NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule, 
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
