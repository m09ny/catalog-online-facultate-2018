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
            { id: 1, Name: 'Mathematics', Teacher: 1 },
            { id: 2, Name: 'Informatics', Teacher: 1 },
            { id: 3, Name: 'Chemistry', Teacher: 2 },
            { id: 4, Name: 'Physics', Teacher: 2 },
            { id: 5, Name: 'Sport', Teacher: 3 },
            { id: 6, Name: 'Romanian Language', Teacher: 3 },
        ];

        this.users = [
            { id: 1, UserName: 'monica', Password: '1', Role: 1 },
            { id: 2, UserName: 'linda', Password: '1', Role: 1 },
            { id: 3, UserName: 'adrian', Password: '1', Role: 1 },
            { id: 4, UserName: 'alex', Password: '1', Role: 2 },
            { id: 5, UserName: 'andreea', Password: '1', Role: 2 },
            { id: 6, UserName: 'andrei', Password: '1', Role: 2 },
        ];

        this.teachers = [
            { id: 1, Name: 'Valcu Monica'},
            { id: 2, Name: 'Szasz Linda'},
            { id: 3, Name: 'Pop Adrian'},
        ];

        this.students = [
            { id: 4, Name: 'Matei Alexandru'},
            { id: 5, Name: 'Popescu Andreea'},
            { id: 6, Name: 'Mahalean Andrei'},
        ];

        this.studentCourses = [
            { id: 1, id1: 4, id2: 1}, // studentul 1, cursul 1
            { id: 2, id1: 4, id2: 2}, // studentul 1, cursul 2
            { id: 3, id1: 4, id2: 3}, // studentul 1, cursul 3
            { id: 4, id1: 5, id2: 4}, // studentul 1, cursul 4
            { id: 5, id1: 5, id2: 5}, // studentul 2, cursul 5
            { id: 6, id1: 5, id2: 6}, // studentul 2, cursul 6
            { id: 7, id1: 6, id2: 1}, // studentul 3, cursul 1
            { id: 8, id1: 6, id2: 5}, // studentul 3, cursul 5
            { id: 9, id1: 6, id2: 6}, // studentul 3, cursul 6
            { id: 10, id1: 6, id2: 3}  // studentul 3, cursul 3
        ];

        this.studentInfo = [
            { id: 1, StudentId: 4, CourseId: 1, Grade: 8 },
            { id: 2, StudentId: 4, CourseId: 2, Grade: 10 },
            { id: 3, StudentId: 4, CourseId: 3, Grade: 7 },
            { id: 4, StudentId: 5, CourseId: 6, Grade: 9 },
            { id: 5, StudentId: 5, CourseId: 1, Grade: 6 },
            { id: 6, StudentId: 5, CourseId: 3, Grade: 8 },
            { id: 7, StudentId: 6, CourseId: 6, Grade: 10 },
            { id: 8, StudentId: 6, CourseId: 5, Grade: 9 },
            { id: 9, StudentId: 6, CourseId: 4, Grade: 8 },
            { id: 9, StudentId: 6, CourseId: 3, Grade: 8 }
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