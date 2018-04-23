export enum UserRole { Teacher = 1, Student = 2 }
export class User {
    id: number;
    UserName: string;
    Password: string;
    Role: UserRole;
}