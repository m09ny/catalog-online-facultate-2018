import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Menu } from './_models/menu.model';
import { AuthenticateService } from './_services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menu: Menu[] = [
    { Name: 'Home', Path: '/', Active: true },
    { Name: 'Courses', Path: '/courses', Active: false },
    { Name: 'Teachers', Path: '/teachers', Active: false },
    { Name: 'Students', Path: '/students', Active: false},
    { Name: 'Contact', Path: '/contact', Active: false }
  ];

  constructor(private authenticate: AuthenticateService,
    private router: Router) { }

  setItemActive(item: Menu) {
    this.menu.forEach(element => element.Active = false);
    item.Active = true;
  }

  showMenu() {
    return localStorage.getItem('currentUser') !== null;
  }

  logout() {
    this.authenticate.logout();
  }
}
