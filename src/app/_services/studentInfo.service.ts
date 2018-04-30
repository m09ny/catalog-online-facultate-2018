import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { StudentInfo } from '../_models/studentInfo.model';

@Injectable()
export class StudentInfoService {
    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private StudentsInfoUrl = 'api/studentInfo'; // URL to web api

    constructor(private http: HttpClient) {}

    getStudentInfos(): Promise<StudentInfo[]> {
        return this.http.get(this.StudentsInfoUrl)
                        .toPromise()
                        .then(response => response as StudentInfo[])
                        .catch(this.handleError);
    }

    getStudentInfo(id: number): Promise<StudentInfo> {
        const url = `${this.StudentsInfoUrl}/${id}`;
        return this.http.get(url)
                        .toPromise()
                        .then(response => response as StudentInfo)
                        .catch(this.handleError);
      }

    deleteStudentInfo(StudentInfo: StudentInfo): Promise<any>{
        let deleteURL = `${this.StudentsInfoUrl}/${StudentInfo.id}`;
       
        return this.http.delete(deleteURL)
                        .toPromise()
                        .then(this.success)
                        .catch(this.handleError);
    }

    insertStudentInfo(StudentInfo: StudentInfo): Promise<StudentInfo>{
        return this.http.post(this.StudentsInfoUrl, StudentInfo, { headers: this.headers })
                        .toPromise()
                        .then(response => response as StudentInfo)
                        .catch(this.handleError);
    }

    updateStudentInfo(StudentInfo: StudentInfo): Promise<any>{
        let updateURL = `${this.StudentsInfoUrl}/${StudentInfo.id}`;

        return this.http.put(updateURL, StudentInfo, { headers: this.headers })
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