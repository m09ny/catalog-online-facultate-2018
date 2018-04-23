import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { Course } from '../../_models/course.model';
import { CourseService }  from '../../_services/courses.service';
import { TeacherService } from '../../_services/teachers.service';
import { Teacher } from '../../_models/teacher.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [];

  constructor(private courseService: CourseService,
    private teacherService: TeacherService) { }

  ngOnInit() {
    Promise.all([this.courseService.getCourses(), this.teacherService.getTeachers()])
      .then ((response: [Course[], Teacher[]]) => {
          if (response && response.length > 0 && response[0].length > 0 && response[1].length > 0) {
            let teachers = [];
            for (let elem of response[1]) {
              teachers[elem.id] = elem;
            }

            this.courses = response[0];
            for (let elem of this.courses) {
              elem.TeacherName = teachers[elem.Teacher].Name;
            }            
          } else {
            alert ("No elements");
          }
        })
      .catch ((reason: any) => alert(JSON.stringify(reason)));
  }

}
