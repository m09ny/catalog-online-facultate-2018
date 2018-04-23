import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { appRoutes } from './app.routing';
import { environment } from '../environments/environment';

import { AuthGuard } from './_guards/auth.guard';

import { AuthenticateData } from './_data/login.data';

import { AuthenticateService } from './_services/login.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './login/login.component';
import { CoursesComponent } from './pages/courses/courses.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    CoursesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(AuthenticateData),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuard, AuthenticateService],
  bootstrap: [AppComponent],
  exports: [HomeComponent, ContactComponent, LoginComponent, CoursesComponent]
})
export class AppModule { }
