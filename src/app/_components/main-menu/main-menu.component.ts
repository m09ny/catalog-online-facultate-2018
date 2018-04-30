import { Component, OnInit } from '@angular/core';
import { Menu } from '../../_models/menu.model';
import { User, UserRole } from '../../_models/user.model';
import { AuthenticateService } from '../../_services/login.service';

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  menu: Menu[] = [];
  user: User = null;
  
  constructor(private authenticate: AuthenticateService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    if (this.user) {
      this.menu = this.menu.concat([
        { Name: 'Home', Path: '/', Active: true }
      ]);
      if (this.user.Role === UserRole.Teacher) {
        this.menu = this.menu.concat([{ Name: 'Students', Path: '/students', Active: false}]);
      }

      if (this.user.Role === UserRole.Student) {
        this.menu = this.menu.concat([
          { Name: 'Courses', Path: '/courses', Active: false },
          { Name: 'Teachers', Path: '/teachers', Active: false }
        ]);
      }

      this.menu = this.menu.concat([
        { Name: 'Contact', Path: '/contact', Active: false }
      ]);
    }
  }

  setItemActive(item: Menu) {
    this.menu.forEach(element => element.Active = false);
    item.Active = true;
  }

  roleAsString(role: UserRole): string {
    return UserRole[role];
  }

  logout() {
    this.authenticate.logout();
  }
}
