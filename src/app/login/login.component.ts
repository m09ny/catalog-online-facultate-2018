import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticateService } from '../_services/login.service';

import { Login } from '../_models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: Login = new Login();
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticate:AuthenticateService) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  validateUser() {
    if ((this.model.UserName || '').length > 0 && (this.model.Password || '').length > 0) {
      this.authenticate.login(this.model.UserName, this.model.Password)
        .then((login: Login) => {
          this.router.navigate([this.returnUrl]);
        })
        .catch((reason) => alert(reason));
    } else {
      alert('Empty username or password... Retry!');
    }
  }
}
