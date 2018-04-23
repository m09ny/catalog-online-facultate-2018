import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs/Observable';

import { Course } from '../_models/course.model';

export class CoursesData implements InMemoryDbService {
    courses: Course[] = [];
    createDb() {
        this.courses = [
            { id: 1, Name: 'Math', Teacher: 1 },
            { id: 2, Name: 'Info', Teacher: 2 },
        ];

        return { courses: this.courses };
    }

    genId() {
        return this.courses.length + 1;
    }
}