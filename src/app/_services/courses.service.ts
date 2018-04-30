import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { Course } from '../_models/course.model';

@Injectable()
export class CourseService {
    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private CoursesUrl = 'api/courses'; // URL to web api

    constructor(private http: HttpClient) {}

    getCourses(user?): Promise<Course[]> {
        let url = user && user.id
            ? "?Teacher=" + user.id
            : "";

        return this.http.get(this.CoursesUrl + url) 
                        .toPromise()
                        .then(response => response as Course[])
                        .catch(this.handleError);
    }

    getCourse(id: number): Promise<Course> {
        const url = `${this.CoursesUrl}/${id}`;
        return this.http.get(url)
                        .toPromise()
                        .then(response => response as Course)
                        .catch(this.handleError);
      }

    deleteCourse(Course: Course): Promise<any>{
        let deleteURL = `${this.CoursesUrl}/${Course.id}`;
       
        return this.http.delete(deleteURL)
                        .toPromise()
                        .then(this.success)
                        .catch(this.handleError);
    }

    insertCourse(Course: Course): Promise<Course>{
        return this.http.post(this.CoursesUrl, Course, { headers: this.headers })
                        .toPromise()
                        .then(response => response as Course)
                        .catch(this.handleError);
    }                   


    updateCourse(Course: Course): Promise<any>{
        let updateURL = `${this.CoursesUrl}/${Course.id}`;

        return this.http.put(updateURL, Course, { headers: this.headers })
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