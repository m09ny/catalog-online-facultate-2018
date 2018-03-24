import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Employee } from './models/employee';

@Injectable()
export class EmployeeService {
    private employeesURL = 'app/employees';

    constructor(private http: Http) {}

    getEmployees(): Promise<Employee[]> {
        return this.http.get(this.employeesURL)
                        .toPromise()
                        .then(response=> response.json().data as Employee[])
                        .catch(this.handleError);
    }

    deleteEmployee(employee: Employee): Promise<any>{
        return new Promise(resolve => {         
        });
    }

    insertEmployee(employee: Employee): Promise<any>{
        return new Promise(resolve => {         
        });
    }

    updateEmployee(employee: Employee): Promise<any>{
        return Promise.resolve();
    }

    private handleError(error: any){
        console.log('An error occured', error);
        return Promise.reject(error.message || error);
    }
    

}