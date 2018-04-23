import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { Teacher } from '../_models/teacher.model';

@Injectable()
export class TeacherService {
    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private TeachersUrl = 'api/teachers'; // URL to web api

    constructor(private http: HttpClient) {}

    getTeachers(): Promise<Teacher[]> {
        return this.http.get(this.TeachersUrl)
                        .toPromise()
                        .then(response => response as Teacher[])
                        .catch(this.handleError);
    }

    getTeacher(id: number): Promise<Teacher> {
        const url = `${this.TeachersUrl}/${id}`;
        return this.http.get(url)
                        .toPromise()
                        .then(response => response as Teacher)
                        .catch(this.handleError);
      }

    deleteTeacher(Teacher: Teacher): Promise<any>{
        let deleteURL = `${this.TeachersUrl}/${Teacher.id}`;
       
        return this.http.delete(deleteURL)
                        .toPromise()
                        .then(this.success)
                        .catch(this.handleError);
    }

    insertTeacher(Teacher: Teacher): Promise<Teacher>{
        return this.http.post(this.TeachersUrl, Teacher, { headers: this.headers })
                        .toPromise()
                        .then(response => response as Teacher)
                        .catch(this.handleError);
    }                   


    updateTeacher(Teacher: Teacher): Promise<any>{
        let updateURL = `${this.TeachersUrl}/${Teacher.id}`;

        return this.http.put(updateURL, Teacher, { headers: this.headers })
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