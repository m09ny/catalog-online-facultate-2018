import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { Employee } from './models/employee';

@Injectable()
export class EmployeeService {
    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private employeesUrl = 'api/employees'; // URL to web api

    constructor(private http: HttpClient) {}

    getEmployees(): Promise<Employee[]> {
        return this.http.get(this.employeesUrl)
                        .toPromise()
                        .then(response => response as Employee[])
                        .catch(this.handleError);
    }

    getEmployee(id: number): Promise<Employee> {
        const url = `${this.employeesUrl}/${id}`;
        return this.http.get(url)
                        .toPromise()
                        .then(response => response as Employee)
                        .catch(this.handleError);
      }

    deleteEmployee(employee: Employee): Promise<any>{
        let deleteURL = `${this.employeesUrl}/${employee.id}`;
       
        return this.http.delete(deleteURL)
                        .toPromise()
                        .then(this.success)
                        .catch(this.handleError);
    }

    insertEmployee(employee: Employee): Promise<Employee>{
        return this.http.post(this.employeesUrl, employee, { headers: this.headers })
                        .toPromise()
                        .then(response => response as Employee)
                        .catch(this.handleError);
    }                   


    updateEmployee(employee: Employee): Promise<any>{
        let updateURL = `${this.employeesUrl}/${employee.id}`;

        return this.http.put(updateURL, employee, { headers: this.headers })
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