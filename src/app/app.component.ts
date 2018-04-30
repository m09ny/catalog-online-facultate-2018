import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Menu } from './_models/menu.model';
import { AuthenticateService } from './_services/login.service';
import { User, UserRole } from './_models/user.model';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
  }

  showMenu() {
    return localStorage.getItem('currentUser') !== null;
  }
}
