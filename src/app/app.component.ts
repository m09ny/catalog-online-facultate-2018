import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Menu } from './_models/menu.model';
import { AuthenticateService } from './_services/login.service';
import { User, UserRole } from './_models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menu: Menu[] = [];
  user: User = null;

  constructor(private authenticate: AuthenticateService,
    private router: Router) {
      this.user = JSON.parse(localStorage.getItem("currentUser"));

      this.menu = this.menu.concat([
        { Name: 'Home', Path: '/', Active: true },
        { Name: 'Courses', Path: '/courses', Active: false }
      ]);
      if (this.user.Role === UserRole.Teacher) {
        this.menu = this.menu.concat([{ Name: 'Students', Path: '/students', Active: false}]);
      }

      if (this.user.Role === UserRole.Student) {
        this.menu = this.menu.concat([{ Name: 'Teachers', Path: '/teachers', Active: false }]);
      }

      this.menu = this.menu.concat([
        { Name: 'Contact', Path: '/contact', Active: false }
      ]);
  }

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
