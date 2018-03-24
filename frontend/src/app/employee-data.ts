import { InMemoryDbService } from 'angular-in-memory-web-api';

export class EmployeeData implements InMemoryDbService {
    createDb() {
        let employees = [
            { id: '1', firstName: 'Alin', lastName: 'Popescu', cnp: '1790506090098', address:'Alunis 1', phone: '0765079687', employment_date: '2017-09-25', role: 'administrator', salary: '4500.00'},
            { id: '2', firstName: 'Maria', lastName: 'Pavel', cnp: '2860496058870', address:'Ovidiu 9', phone: '0721948567', employment_date: '2017-10-01', role: 'contabil', salary: '3000.00'}
        ];

        return {employees};
    }
}