import { Component, OnInit} from '@angular/core';

import { EmployeeService } from './employee.service';
import { Employee } from './models/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isNewForm: boolean;
  showForm: boolean;
  formEmployee: Employee;
  employees: Employee[];

  constructor(private employeeService: EmployeeService){}

  ngOnInit(){
    this.employeeService.getEmployees()
      .then(employees => this.employees = employees)
      .catch(error => console.log(error));
  }

  showEmployeeForm(employee : Employee){
    if(!employee){
      employee = new Employee();
      this.isNewForm = true;
    }

    this.showForm = true;
    this.formEmployee = employee;
  }

  removeEmployee(employee: Employee){
    this.employeeService.deleteEmployee(employee)
      .then(() => {
        var index = this.employees.indexOf(employee, 0);

        if (index > -1){
          this.employees.splice(index, 1);
        }
      })
      .catch(error => console.log(error));
  }

  saveEmployee(employee: Employee){
    if(employee){
      if(this.isNewForm){
        this.employeeService.insertEmployee(employee)
          .then((insertedEmploye) => this.employees.push(insertedEmploye))
          .catch(error => console.log(error));
      }
      else {
        this.employeeService.updateEmployee(employee)
         /* .then(() => {
            this.employees = [];
            this.ngOnInit()
          })*/
          .catch(error => console.log(error));
      }

      this.showForm = false;
      this.isNewForm = false;
      employee = null;
    }
  }

}
