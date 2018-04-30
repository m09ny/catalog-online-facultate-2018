import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { Student } from '../_models/student.model';
import { Link } from '../_models/link.model';

@Injectable()
export class StudentCoursesService {
    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private StudentCoursesUrl = 'api/studentCourses'; // URL to web api

    constructor(private http: HttpClient) {}

    getStudentCourses(): Promise<Link[]> {
        return this.http.get(this.StudentCoursesUrl)
                        .toPromise()
                        .then(response => response as Link[])
                        .catch(this.handleError);
    }

    deleteStudentCourses(Link: Link): Promise<any>{
        let deleteURL = `${this.StudentCoursesUrl}/${Link.id}`;
       
        return this.http.delete(deleteURL)
                        .toPromise()
                        .then(this.success)
                        .catch(this.handleError);
    }

    updateStudentCourses(Link: Link): Promise<any> {
        let updateURL = `${this.StudentCoursesUrl}/${Link.id}`;

        return this.http.put(updateURL, Link, { headers: this.headers })
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