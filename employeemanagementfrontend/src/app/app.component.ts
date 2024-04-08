import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public title = 'Employee';
  public employees: Employee[] = [];
  public editEmployee!: Employee;
  public deleteEmployee!: Employee;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(employee: Employee | null, mode: String): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    } else if (mode === 'edit' && employee !== null) {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete' && employee !== null) {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddEmloyee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployees(addForm.value).subscribe(
      (response: Employee) => {
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateEmloyee(employee: Employee): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.updateEmployees(employee).subscribe(
      (response: Employee) => {
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmloyee(employeeId: number): void {
    this.employeeService.deleteEmployees(employeeId).subscribe(
      (response: void) => {
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchPilot(key: String): void {
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (
        employee.name.toLowerCase().indexOf(key.toLowerCase()) != -1 ||
        employee.email.toLowerCase().indexOf(key.toLowerCase()) != -1 ||
        employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) != -1 ||
        employee.phone.toLowerCase().indexOf(key.toLowerCase()) != -1
      ) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }
}
