import { ArrayType, ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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

import {FormControl} from '@angular/forms';
import {ViewCourseComponent} from 'src/app/components/view-course/view-course.component';
import { UserService } from 'src/app/shared/services/user.services';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  viewDetailsDialogRef!: MatDialogRef<ViewCourseComponent>;
  message='yo';
  subscription: Subscription | undefined;
  year1Courses: Course[] = [];
  year2Courses:Course[] = [];
  year3Courses:Course[]= [];
  MissingSecondYear:String[]= [];
  MissingThirdYear:String[]= [];
  MissingFirstYear:String[]= [];
  displayedColumns= ['Course_Code','Course_Name','Semester']
  constructor(private dialog:MatDialog,private userService:UserService){
    
  }

  ngOnInit(): void {
    this.userService.currentCourse.subscribe((message:any) => {
    
    if(this.message =="1"){
      this.year1Courses=message;
    }
    if(this.message =="2"){
      this.year2Courses=message;
    }
    if(this.message =="3"){
      this.year3Courses=message;
    }
    console.log(this.year1Courses,this.year2Courses,this.year3Courses)
    })
  }
  openCourseView(year:string):void{
    
    //always updates the year between components
    this.subscription = this.userService.currentMessage.subscribe((message:any) => this.message = message)
    this.viewDetailsDialogRef = this.dialog.open(ViewCourseComponent);//opens view-course
    this.viewDetailsDialogRef.afterClosed().subscribe((s:any)=>{ //validation of pre/co reqs
      this.ValidateCourseRequirements()
    });
    this.newMessage(year); //submits year to view-course component
  }
  newMessage(message:string) {
    this.userService.changeMessage(message)
  }

  ValidateCourseRequirements():void{
    let PreReqs1:string="";
    let CoReqs1:string="";
    let PreReqs2:string="";
    let CoReqs2:string="";
    let PreReqs3:string="";
    let CoReqs3:string="";

    for(let i=0;i<this.year1Courses.length;i++){
      PreReqs1 = PreReqs1.concat(this.year1Courses[i].Pre_requisite)
      CoReqs1 = CoReqs1.concat(this.year1Courses[i].Co_requisite)
    }
    let FirstPreReqs:string[] =PreReqs1.split(";");
    let FirstCoReqs:string[] =CoReqs1.split(";");
    FirstPreReqs.pop(); // TO REMOVE LAST EMPTRY ARRAY
    FirstCoReqs.pop(); // TO REMOVE LAST EMPTRY ARRAY


    for(let i=0;i<this.year2Courses.length;i++){
      PreReqs2 = PreReqs2.concat(this.year2Courses[i].Pre_requisite)
      CoReqs2 = CoReqs2.concat(this.year2Courses[i].Co_requisite)
    }
    let SecondPreReqs:string[] =PreReqs2.split(";");
    let SecondCoReqs:string[] =CoReqs2.split(";");
    SecondPreReqs.pop(); // TO REMOVE LAST EMPTRY ARRAY
    SecondCoReqs.pop(); // TO REMOVE LAST EMPTRY ARRAY


    for(let i=0;i<this.year3Courses.length;i++){
      PreReqs3 = PreReqs3.concat(this.year3Courses[i].Pre_requisite)
      CoReqs3 = CoReqs3.concat(this.year3Courses[i].Co_requisite)
    }
    let ThirdPreReqs:string[] =PreReqs3.split(";");
    let ThirdCoReqs:string[] =CoReqs3.split(";");
    ThirdPreReqs.pop(); // TO REMOVE LAST EMPTRY ARRAY
    ThirdCoReqs.pop(); // TO REMOVE LAST EMPTRY ARRAY

    let AllThirdYearCourses:String[] =[];
    let AllSecondYearCourses:String[] =[];
    let AllFirstYearCourses:String[] =[];
    //garthers all 2nd year courses in array
    for(let i=0;i<this.year1Courses.length;i++){ 
      AllFirstYearCourses.push(this.year1Courses[i].Course_Code)
    }
    for(let i=0;i<this.year2Courses.length;i++){ 
      AllSecondYearCourses.push(this.year2Courses[i].Course_Code)
    }
    
    for(let i=0;i<this.year3Courses.length;i++){ 
      AllThirdYearCourses.push(this.year3Courses[i].Course_Code)
    }
    
    //first yearchecks

    for(let i=0;i<FirstCoReqs.length;i++){ 
      if(!AllFirstYearCourses.includes(FirstCoReqs[i])){
        console.warn('Missing CoReq 1')
        if(!this.MissingFirstYear.includes(FirstCoReqs[i])){
          this.MissingFirstYear.push(FirstCoReqs[i])
        }
      }
    }
      //second yearchecks
  
      for(let i=0;i<SecondPreReqs.length;i++){ 
        if(!AllFirstYearCourses.includes(SecondPreReqs[i])){
          console.warn('Missing PreReq 2')
          if(!this.MissingFirstYear.includes(SecondPreReqs[i])){
            this.MissingFirstYear.push(SecondPreReqs[i])
          }
        }
      }
      for(let i=0;i<SecondCoReqs.length;i++){ 
        if(!AllSecondYearCourses.includes(SecondCoReqs[i])){
          console.warn('Missing CoReq 2')
          if(!this.MissingSecondYear.includes(SecondCoReqs[i])){
            this.MissingSecondYear.push(SecondCoReqs[i])
          }
        }
      }
          //third yearchecks
  
  for(let i=0;i<ThirdPreReqs.length;i++){ 
    if(!AllSecondYearCourses.includes(ThirdPreReqs[i])){
      console.warn('Missing PreReq 3')
      if(!this.MissingSecondYear.includes(ThirdPreReqs[i])){
        this.MissingSecondYear.push(ThirdPreReqs[i])
      }
    }
  }
  for(let i=0;i<ThirdCoReqs.length;i++){ 
    if(!AllThirdYearCourses.includes(ThirdCoReqs[i])){
      console.warn('Missing CoReq 3')
      if(!this.MissingThirdYear.includes(ThirdCoReqs[i])){
        this.MissingThirdYear.push(ThirdCoReqs[i])
      }
    }
  }
  console.log(this.MissingFirstYear,this.MissingSecondYear,this.MissingThirdYear)
  }
  majors: string[] = [
    'Computer Science Major I', 'Mathematics Major I', 'Physics Major I', 'Computational and Applied Mathematics Major I'
  ]
}
