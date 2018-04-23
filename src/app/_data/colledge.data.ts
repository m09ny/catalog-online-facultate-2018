import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs/Observable';

import { Course } from '../_models/course.model';
import { User, UserRole } from '../_models/user.model';
import { Teacher } from '../_models/teacher.model';

export class ColledgeData implements InMemoryDbService {
    courses: Course[] = [];
    users: User[] = [];
    teachers: Teacher[] = [];

    createDb() {
        this.courses = [
            { id: 1, Name: 'Math', Teacher: 1 },
            { id: 2, Name: 'Info', Teacher: 2 },
        ];

        this.users = [
            { id: 1, UserName: 'monica', Password: '1', Role: 1 },
            { id: 2, UserName: 'linda', Password: '1', Role: 2 },
            { id: 2, UserName: 'adrian', Password: '1', Role: 2 },
        ];

        this.teachers = [
            { id: 1, Name: 'Popescu'},
            { id: 2, Name: 'Ionescu'},
        ];

        return { users: this.users, courses: this.courses, teachers: this.teachers };
    }
}