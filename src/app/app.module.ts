import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DataTableModule } from 'primeng/datatable';
import { DropdownModule } from 'primeng/dropdown';

import { appRoutes } from './app.routing';
import { environment } from '../environments/environment';

import { AuthGuard } from './_guards/auth.guard';

import { ColledgeData } from './_data/colledge.data';

import { AuthenticateService } from './_services/login.service';
import { CourseService } from './_services/courses.service';
import { TeacherService } from './_services/teachers.service';
import { StudentService } from './_services/students.service';
import { StudentCoursesService } from './_services/studentCourses.service';
import { StudentInfoService } from './_services/studentInfo.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './login/login.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { StudentsComponent } from './pages/students/students.component';
import { MainMenuComponent } from './_components/main-menu/main-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    CoursesComponent,
    TeachersComponent,
    StudentsComponent,
    MainMenuComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(ColledgeData),
    RouterModule.forRoot(appRoutes),
    DataTableModule,
    DropdownModule
  ],
  providers: [AuthGuard, AuthenticateService, CourseService, TeacherService, StudentService, StudentCoursesService, StudentInfoService],
  bootstrap: [AppComponent],
  exports: [HomeComponent, ContactComponent, LoginComponent, CoursesComponent, TeachersComponent, StudentsComponent]
})
export class AppModule { }
