import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Student } from '../../_models/student.model';
import { StudentService } from '../../_services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  student : Student[] = [];

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getStudents()
    .then((response: Student[]) => {
      if (response && response.length > 0){
        this.student = response;
      } else {
        alert("No students");
      }
    })
    .catch((reason: any) => alert(JSON.stringify(reason)));
  }

}
