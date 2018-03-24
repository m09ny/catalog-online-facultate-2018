import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Employee } from './models/employee';

@Injectable()
export class EmployeeService {
    private employeesUrl = 'api/employees';

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    getEmployees(): Promise<Employee[]> {
        return this.http.get(this.employeesUrl)
                        .toPromise()
                        .then(response=> response.json().data as Employee[])
                        .catch(this.handleError);
    }

    deleteEmployee(employee: Employee): Promise<any>{
        let deleteURL = `${this.employeesUrl}/${employee.id}`;
       
        return this.http.delete(deleteURL)
                        .toPromise()
                        .then(this.success)
                        .catch(this.handleError);

        /*return new Promise(resolve => {     
            resolve();    
        });*/
    }

    insertEmployee(employee: Employee): Promise<Employee>{
        return this.http.post(this.employeesUrl, JSON.stringify(employee), { headers: this.headers })
                        .toPromise()
                        .then(response => response.json().data as Employee)
                        .catch(this.handleError);
    }                   


    updateEmployee(employee: Employee): Promise<any>{
        let updateURL = `${this.employeesUrl}/${employee.id}`;

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