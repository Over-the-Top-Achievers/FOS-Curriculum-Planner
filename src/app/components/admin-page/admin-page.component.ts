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
  // courses$ = this.courseService.getCourses();
  courses:any;
  courses$ = this.courseService.getCourses$();//this is an observable

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private courseService: CourseService, //dependency injection
    private dialog: MatDialog,
    private http: HttpClient,
    private formbuilder:FormBuilder,
  ) { }


  downloadCSV():void {
    this.courseService.getCSV$().subscribe( (data)=>{

      const blob: Blob = new Blob( [data], { type: 'text/csv' });
      const fileName = 'budget.csv';
      const objectUrl: string = URL.createObjectURL(blob);
      const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
  
      a.href = objectUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
  
    },(err)=> console.log(err)
    );
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
    console.log(courseCode)
    if (courseCode === undefined){
      throw new Error("No course to delete");
    }

    else{
      var body =  {courseCode:courseCode.Course_Code};
      this.courseService.deleteCourse(courseCode.Course_Code);

    }
    this.refresh();
  }

  refresh(): void {
    window.location.reload();
  }

// this is for the adding course function
// using checkout form modules to record the user input. 
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
addCourse(): void {
  // Process checkout data here
  //this.items = this.courseService.clearCart();
  console.warn('Course is being added to the database.', this.checkoutForm.value);

  var body=
     {Course_Code:this.checkoutForm.value.Course_Code,
      Course_Name:this.checkoutForm.value.Course_Name,
      Credits:this.checkoutForm.value.Credits,
      NQF:this.checkoutForm.value.NQF,
      Slot:this.checkoutForm.value.Slot,
      Semester:this.checkoutForm.value.Semester,
      Year:this.checkoutForm.value.Year,
      Pre_requisite:this.checkoutForm.value.Pre_requisite,
      Co_requsite:this.checkoutForm.value.Co_requisite};


  this.courseService.addCourse(body);
  this.checkoutForm.reset();
  this.refresh();
}
updateForm = this.formbuilder.group({
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

updateCourse():void{
  var body=
  {
    oldCourseCode:this.updateForm.value.Course_Code, //means never changes the course code right now 
    newCourseCode:this.updateForm.value.Course_Code,//but add one for field new name
    newCourseName:this.updateForm.value.Course_Name,
    newCred:this.updateForm.value.Credits,
    newNQF:this.updateForm.value.NQF,
    newSlot:this.updateForm.value.Slot,
    newSem:this.updateForm.value.Semester,
    newYear:this.updateForm.value.Year,
    newPreReq:this.updateForm.value.Pre_requisite,
    newCoReq:this.updateForm.value.Co_requisite};
  this.courseService.updateCourse(body);
  this.updateForm.reset();
  this.refresh();
}

close(){    
    console.log('Close button clicked');
    //this.router.navigate(['/admin-page']);
    window.location.reload();
  }

}
