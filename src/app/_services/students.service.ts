import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { Student } from '../_models/student.model';

@Injectable()
export class StudentService {
    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private StudentsUrl = 'api/students'; // URL to web api

    constructor(private http: HttpClient) {}

    getStudents(): Promise<Student[]> {
        return this.http.get(this.StudentsUrl)
                        .toPromise()
                        .then(response => response as Student[])
                        .catch(this.handleError);
    }

    getStudent(id: number): Promise<Student> {
        const url = `${this.StudentsUrl}/${id}`;
        return this.http.get(url)
                        .toPromise()
                        .then(response => response as Student)
                        .catch(this.handleError);
      }

    deleteStudent(Student: Student): Promise<any>{
        let deleteURL = `${this.StudentsUrl}/${Student.id}`;
       
        return this.http.delete(deleteURL)
                        .toPromise()
                        .then(this.success)
                        .catch(this.handleError);
    }

    insertStudent(Student: Student): Promise<Student>{
        return this.http.post(this.StudentsUrl, Student, { headers: this.headers })
                        .toPromise()
                        .then(response => response as Student)
                        .catch(this.handleError);
    }                   


    updateStudent(Student: Student): Promise<any>{
        let updateURL = `${this.StudentsUrl}/${Student.id}`;

        return this.http.put(updateURL, Student, { headers: this.headers })
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