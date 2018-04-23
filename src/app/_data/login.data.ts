import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs/Observable';

import { User, UserRole } from '../_models/user.model';

export class AuthenticateData implements InMemoryDbService {
    users: User[] = [];
    createDb() {
        this.users = [
            { id: 1, UserName: 'adrian', Password: '1', Role: 1 },
            { id: 2, UserName: 'monica', Password: '1', Role: 2 },
        ];

        return { users: this.users };
    }

    genId() {
        return this.users.length + 1;
    }
}