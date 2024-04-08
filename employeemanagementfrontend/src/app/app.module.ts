import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { AppComponent } from './app.component';
import { EmployeeService } from './employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule,BrowserModule, HttpClientModule,FormsModule],
  providers: [EmployeeService, HttpClientModule],
  bootstrap: [],
})
export class AppModule {}
