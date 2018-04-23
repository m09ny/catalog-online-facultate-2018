import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Teacher } from '../../_models/teacher.model';
import { TeacherService } from '../../_services/teachers.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  teacher : Teacher[] = [];

  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
    this.teacherService.getTeachers()
      .then((response: Teacher[]) => {
        if (response && response.length > 0){
          this.teacher = response;
        } else {
          alert("No teachers");
        }
      })
      .catch((reason: any) => alert(JSON.stringify(reason)));
  }

}
