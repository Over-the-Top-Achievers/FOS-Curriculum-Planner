import { ArrayType } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import "node_modules/bootstrap/scss/bootstrap.scss"
import {MatDialog} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material/dialog/dialog-ref';

import { CourseService } from 'src/app/shared/services/course.services';

import { Course } from 'src/app/shared/models';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {

  courses$ = this.courseService.getCourses();//this is an observable
  csv$ = this.courseService.getCSV();
  csvdata :string | undefined;
  items = this.courseService.getCourses();
  checkoutForm = this.formbuilder.group({
    Course_Code:'',
    Course_Name:'',
    Credits:'',
    NQF:'',
    Slot:'',
    Semester:'',
    Year:'',
    Pre_requisite:'',
    Co_requisite:'',
  });

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private courseService: CourseService, //dependency injection
    private dialog: MatDialog,
    private http: HttpClient,
    private formbuilder:FormBuilder,
  ) { }
  getCSV():any{
    this.csv$.subscribe((data) => { 
      this.downloadCSV(data);
      this.csvdata = data} 
      );
  }
  downloadCSV(data:Blob):void {
    const blob: Blob = new Blob([data], { type: 'text/csv' });
    const fileName = 'budget.csv';
    const objectUrl: string = URL.createObjectURL(blob);
    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

    a.href = objectUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    console.log(this.csvdata)
  }
  ngOnInit(): void {
    
  }

  selectedCourse?: Course;
  displayCourseInfo(courseCode:any){
    this.selectedCourse = courseCode;
    //this.viewDetailsDialogRef = this.dialog.open(ViewCourseComponent, {data: this.selectedCourse});    
  }  

  courseToDelete?: Course;
  deleteCourse(courseCode?:any){
    this.courseToDelete = courseCode;
    if (courseCode === undefined){
      throw new Error("No course to delete");
    }
    
    else{
      var options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: {courseCode:courseCode.Course_Code},
      };

      console.log(courseCode);      
      //delete stuff here 
      console.log(courseCode.Course_Code);
      this.http.request('DELETE','http://localhost:8080/courses', options).subscribe((s) => {
        console.log(s);
      });
      
    }    
  }

  refresh(): void {
    window.location.reload();
}


// this is for the adding course function
// using checkout form modules to record the user input. 
addCourse(): void {
  // Process checkout data here
  //this.items = this.courseService.clearCart();
  console.warn('Course is being added to the database.', this.checkoutForm.value);

  var options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    body: {Course_Code:this.checkoutForm.value.Course_Code,
      Course_Name:this.checkoutForm.value.Course_Name,
      Credits:this.checkoutForm.value.Credits,
      NQF:this.checkoutForm.value.NQF,
      Slot:this.checkoutForm.value.Slot,
      Semester:this.checkoutForm.value.Semester,
      Year:this.checkoutForm.value.Year,
      Pre_requisite:this.checkoutForm.value.Pre_requisite,
      Co_requsite:this.checkoutForm.value.Co_requisite},
    
  };

  this.http.post('http://localhost:8080/courses', options.body).subscribe((s) => {
    console.log(s);
  });

  this.checkoutForm.reset();
}
  close(){    
    console.log('Close button clicked');
    //this.router.navigate(['/admin-page']);
    window.location.reload();
  }

}
