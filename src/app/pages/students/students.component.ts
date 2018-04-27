import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Student } from '../../_models/student.model';
import { StudentService } from '../../_services/students.service';
import { StudentCoursesService } from '../../_services/studentCourses.service';
import { Link } from '../../_models/link.model';
import { TeacherService } from '../../_services/teachers.service';
import { Teacher } from '../../_models/teacher.model';
import { CourseService } from '../../_services/courses.service';
import { Course } from '../../_models/course.model';
import { User } from '../../_models/user.model';
import { StudentInfoService } from '../../_services/studentInfo.service';
import { StudentInfo } from '../../_models/studentInfo.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  student : StudentInfo[] = [];

  constructor (
      private courseService: CourseService,
      private studentService: StudentService,
      private studentCoursesService: StudentCoursesService,
      private studentInfoService: StudentInfoService
    ) { }

  ngOnInit() {
    var user:User = JSON.parse(localStorage.getItem("currentUser"));

    Promise.all([this.courseService.getCourses(), 
        this.studentService.getStudents(), 
        this.studentCoursesService.getStudentCourses(),
        this.studentInfoService.getStudentInfos()])
      .then((response: [Course[], Student[], Link[], StudentInfo[]]) => {
        if (response && response.length > 0){
          var courses = response[0].filter((value) => value.Teacher === user.id);

          var studentCourses = [];
          for (var ndx1 in courses) {
            for (var ndx2 in response[2]) {
              if (courses[ndx1].id === response[2][ndx2].id2) {
                studentCourses.push(response[2][ndx2].id1);
              }
            }
          }
          
          var students = response[1].filter((value) => studentCourses.indexOf(value.id) >= 0);

          var student = [];
          for (var ndx1 in courses) {
            for (var ndx2 in students) {
              var info = new StudentInfo();
              info.CourseId = courses[ndx1].id;
              info.CourseName = courses[ndx1].Name;
              info.StudentId = students[ndx2].id;
              info.StudentName = students[ndx2].Name;

              var dbInfo = response[3].find((value) => value.CourseId === courses[ndx1].id 
                && value.StudentId === students[ndx2].id);
              info.Grade = dbInfo ? dbInfo.Grade : null;

              student.push(info);
            }
          }
          this.student = student;
          console.log(this.student);
        } else {
          alert("No data");
        }
      })
      .catch((reason: any) => alert("Error: " + JSON.stringify(reason)));
    }
}
