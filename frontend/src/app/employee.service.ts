import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Employee } from './models/employee';
import { Header } from '@clr/angular';

@Injectable()
export class EmployeeService {
    private employeesURL = 'app/employees';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    getEmployees(): Promise<Employee[]> {
        return this.http.get(this.employeesURL)
                        .toPromise()
                        .then(response=> response.json().data as Employee[])
                        .catch(this.handleError);
    }

    deleteEmployee(employee: Employee): Promise<any>{
        let deleteURL = `${this.employeesURL}/${employee.id}`;
       
        return this.http.delete(deleteURL)
                        .toPromise()
                        .then(this.success)
                        .catch(this.handleError);

        /*return new Promise(resolve => {     
            resolve();    
        });*/
    }

    insertEmployee(employee: Employee): Promise<Employee>{
        return this.http.post(this.employeesURL, JSON.stringify(employee), { headers: this.headers })
                        .toPromise()
                        .then(response => response.json().data as Employee)
                        .catch(this.handleError);
    }                   


    updateEmployee(employee: Employee): Promise<any>{
        let updateURL = `${this.employeesURL}/${employee.id}`;

        return this.http.put(updateURL, JSON.stringify(employee), { headers: this.headers })
                        .toPromise()
                        .then(this.success)
                        .catch(this.handleError);
    }

    private handleError(error: any){
        console.log('An error occured', error);
        return Promise.reject(error.message || error);
    }
    
    private success(): Promise<any>{
        return Promise.resolve();
    }

}