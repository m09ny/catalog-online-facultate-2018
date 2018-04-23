import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { CommonModule }           from '@angular/common';

import { AuthGuard }              from './_guards/auth.guard';

import { LoginComponent }         from './login/login.component';
import { HomeComponent }          from './pages/home/home.component';
import { ContactComponent }       from './pages/contact/contact.component';
import { CoursesComponent }       from './pages/courses/courses.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'courses', component: CoursesComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];