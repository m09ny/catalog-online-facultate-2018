import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs/Observable';

import { Course } from '../_models/course.model';
import { User, UserRole } from '../_models/user.model';
import { Teacher } from '../_models/teacher.model';
import { Student } from '../_models/student.model';
import { Link } from '../_models/link.model';
import { StudentInfo } from '../_models/studentInfo.model';

export class ColledgeData implements InMemoryDbService {
    courses: Course[] = [];
    users: User[] = [];
    teachers: Teacher[] = [];
    students: Student[] = [];
    studentCourses: Link[] = [];
    studentInfo: StudentInfo[] = [];

    createDb() {
        this.courses = [
            { id: 1, Name: 'Math', Teacher: 1 },
            { id: 2, Name: 'Info', Teacher: 1 },
            { id: 3, Name: 'Chimie', Teacher: 2 },
            { id: 4, Name: 'Fizica', Teacher: 2 },
            { id: 5, Name: 'Sport', Teacher: 3 },
            { id: 6, Name: 'Romana', Teacher: 3 },
        ];

        this.users = [
            { id: 1, UserName: 'monica', Password: '1', Role: 1 },
            { id: 2, UserName: 'linda', Password: '1', Role: 1 },
            { id: 3, UserName: 'adrian', Password: '1', Role: 1 },
            { id: 4, UserName: 'alex', Password: '1', Role: 2 },
            { id: 5, UserName: 'maria', Password: '1', Role: 2 },
            { id: 6, UserName: 'andrei', Password: '1', Role: 2 },
        ];

        this.teachers = [
            { id: 1, Name: 'monica'},
            { id: 2, Name: 'linda'},
            { id: 3, Name: 'adrian'},
        ];

        this.students = [
            { id: 1, Name: 'alex'},
            { id: 2, Name: 'maria'},
            { id: 3, Name: 'andrei'},
        ];

        this.studentCourses = [
            { id: 1, id1: 1, id2: 1}, // studentul 1, cursul 1
            { id: 2, id1: 1, id2: 2},
            { id: 3, id1: 1, id2: 3},
            { id: 4, id1: 1, id2: 4}, 
            { id: 5, id1: 2, id2: 5},
            { id: 6, id1: 2, id2: 6},
            { id: 7, id1: 3, id2: 1}, 
            { id: 8, id1: 3, id2: 5},
            { id: 9, id1: 3, id2: 6}   
        ];

        this.studentInfo = [
            { id: 1, StudentId: 1, CourseId: 1, Grade: 6 }
        ];

        return { users: this.users,
            courses: this.courses,
            teachers: this.teachers,
            students: this.students,
            studentCourses: this.studentCourses,
            studentInfo: this.studentInfo
        };
    }
}