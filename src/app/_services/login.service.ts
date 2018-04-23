import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../_models/login.model';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthenticateService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private userUrl = 'api/users'; // URL to web api

  constructor(private http: HttpClient) {}

  login(username:string, password:string):Promise<Login> {
    let searchURL = `${this.userUrl}?UserName=${username}&Password=${password}`;
    let promise = new Promise<Login>((resolve, reject) => {
      this.http.get(searchURL)
        .toPromise()
        .then(response => {
          if (response instanceof Array && response.length > 0) {
            let user:Login = response[0];
            localStorage.setItem('currentUser', JSON.stringify(user));
            resolve(user);
          } else {
            reject("Wrong user or password!");
          }
        })
        .catch(this.handleError);
    });
    return promise;
  }

  logout():void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  private handleError(error: any){
    console.log('An error occured', error);
    return Promise.reject(error.message || error);
  }

  private success(): Promise<any>{
      return Promise.resolve();
  }
}
