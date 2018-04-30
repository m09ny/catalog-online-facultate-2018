import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { Course } from '../../_models/course.model';
import { CourseService }  from '../../_services/courses.service';
import { TeacherService } from '../../_services/teachers.service';
import { Teacher } from '../../_models/teacher.model';
import { StudentCoursesService } from '../../_services/studentCourses.service';
import { Link } from '../../_models/link.model';
import { User } from '../../_models/user.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [];
  user: User = null;
  maxLinkId: number = 0;

  constructor(private courseService: CourseService,
    private teacherService: TeacherService,
    private studentCoursesService: StudentCoursesService,) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("currentUser"));

    Promise.all([this.courseService.getCourses(), 
        this.teacherService.getTeachers(),
        this.studentCoursesService.getStudentCourses()])
      .then ((response: [Course[], Teacher[], Link[]]) => {
          if (response && response.length > 0 && response[0].length > 0 && response[1].length > 0) {
            let teachers = [], courses = [];

            for (let elem of response[0]) {
              courses[elem.id] = elem;
            }
            for (let elem of response[1]) {
              teachers[elem.id] = elem;
            }

            this.courses = response[0];
            for (let elem of this.courses) {
              elem.TeacherName = teachers[elem.Teacher].Name;
            }
            
            for (let elem of response[2]) {
              this.maxLinkId = Math.max(this.maxLinkId, elem.id);
              if (elem.id1 === this.user.id && courses[elem.id2]) {
                let ndx = this.courses.findIndex((value) => value.id === elem.id2);
                if (ndx >= 0)
                  this.courses[ndx].Enroled = true;
                  this.courses[ndx].LinkId = elem.id;
              }
            }

          } else {
            alert ("No elements");
          }
        })
      .catch ((reason: any) => alert(JSON.stringify(reason)));
  }

  saveCourses() {
    let all = [], currentId = this.maxLinkId + 1;
    for (let info of this.courses) {
      if (info.Enroled) {
        let link = new Link();
        link.id = info.LinkId ? info.LinkId : currentId++;
        link.id1 = this.user.id;
        link.id2 = info.id;
        all.push(this.studentCoursesService.updateStudentCourses(link));
      } else if (info.LinkId) {
        let link = new Link();
        link.id = info.LinkId;
        all.push(this.studentCoursesService.deleteStudentCourses(link));
      }
    }
    Promise.all(all)
      .then(response => alert("Data was saved!"))
      .catch((reason: any) => alert("Error: " + JSON.stringify(reason)));
  }
}
