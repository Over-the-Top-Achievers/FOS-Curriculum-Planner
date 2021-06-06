import { ArrayType, AST, ThrowStmt } from '@angular/compiler';
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

  year2Courses: Course[] = [];
  year3Courses: Course[]= [];

  MissingSecondYear:String[]= [];
  MissingThirdYear:String[]= [];
  MissingFirstYear:String[]= [];
  displayedColumns= ['Course_Code','Course_Name','Semester','button']

  selectedCourse:any;

  SelectedFirstYearCourses:any[] = [];
  SelectedSecondYearCourses:any[] = [];
  SelectedThirdYearCourses:any[] = [];


  afterRemoveYear1:any = [];
  afterRemoveYear2:any = [];
  afterRemoveYear3:any = [];


  creditCounter1:number = 0;
  creditCounter2:number = 0;
  creditCounter3:number = 0;
  year1Clashes:any=[];
  year2Clashes:any=[];
  year3Clashes:any=[];
  sharable = [ "COMS","MATH","STAT"];
  diagonals = ["A","B","C","D","E"];

  constructor(private dialog:MatDialog,
    public userService:UserService
    ){

  }
  removeCourse(course:Course):void{
    if(course.Year==="1"){
      this.message="1"
      let index;
      index = this.year1Courses.indexOf(course)
      this.year1Courses = this.year1Courses.slice(0,index).concat(this.year1Courses.slice(index+1))

      for(var i = 0; i < this.SelectedFirstYearCourses.length; i++){
        if(this.SelectedFirstYearCourses[i].Course_Code != course.Course_Code){
          this.afterRemoveYear1.push(this.SelectedFirstYearCourses[i]);
        }
        
      }

      this.SelectedFirstYearCourses = this.afterRemoveYear1;
      this.afterRemoveYear1 = []

      // console.log(this.SelectedFirstYearCourses)
    }
    else if(course.Year==="2"){
      this.message="2"
      let index;
      index = this.year2Courses.indexOf(course)
      this.year2Courses = this.year2Courses.slice(0,index).concat(this.year2Courses.slice(index+1))

      for(var i = 0; i < this.SelectedSecondYearCourses.length; i++){
        if(this.SelectedSecondYearCourses[i].Course_Code != course.Course_Code){
          this.afterRemoveYear2.push(this.SelectedSecondYearCourses[i]);
        }
        
      }

      this.SelectedSecondYearCourses = this.afterRemoveYear2;
      this.afterRemoveYear2 = []
    }
    else if(course.Year==="3"){
      this.message="3"
      let index;
      index = this.year3Courses.indexOf(course)
      this.year3Courses = this.year3Courses.slice(0,index).concat(this.year3Courses.slice(index+1))

      for(var i = 0; i < this.SelectedThirdYearCourses.length; i++){
        if(this.SelectedThirdYearCourses[i].Course_Code != course.Course_Code){
          this.afterRemoveYear3.push(this.SelectedThirdYearCourses[i]);
        }
        
      }

      this.SelectedThirdYearCourses = this.afterRemoveYear3;
      this.afterRemoveYear3 = []
    }

    
  }
  ngOnInit(): void {
    this.userService.currentCourse.subscribe((message:any) => {
   
    if(this.message =="1"){
      this.year1Courses=this.year1Courses.concat(message);
    }
    if(this.message =="2"){
      this.year2Courses=this.year2Courses.concat(message);
    }
    if(this.message =="3"){
      this.year3Courses=this.year3Courses.concat(message);
    }
   // console.log(this.year1Courses,this.year2Courses,this.year3Courses)
    })


    this.userService.currentCourse.subscribe((selectedCourse:any) =>{
      this.selectedCourse = selectedCourse
      if (this.selectedCourse[0].Year == "1"){
        this.SelectedFirstYearCourses = [];
      }
      if (this.selectedCourse[0].Year == "2"){
        this.SelectedSecondYearCourses = [];
      }
      if (this.selectedCourse[0].Year == "3"){
        this.SelectedThirdYearCourses = [];
      }
      for (let i = 0;i<this.selectedCourse.length;i++){
        if (this.selectedCourse[i].Year == "1"){
          this.SelectedFirstYearCourses.push(this.selectedCourse[i])
        }
        if (this.selectedCourse[i].Year == "2"){
          this.SelectedSecondYearCourses.push(this.selectedCourse[i])
        }
        if (this.selectedCourse[i].Year == "3"){
          this.SelectedThirdYearCourses.push(this.selectedCourse[i])
        }
      }
    })

  }
  openCourseView(year:string):void{
    
    //always updates the year between components
    this.subscription = this.userService.currentMessage.subscribe((message:any) => this.message = message)
    this.viewDetailsDialogRef = this.dialog.open(ViewCourseComponent);//opens view-course
    this.viewDetailsDialogRef.afterClosed().subscribe((s:any)=>{ //validation of pre/co reqs
      this.ValidateCourseRequirements()
      this.year1Clashes= this.ValidateDiagonals(this.year1Courses);
      this.year2Clashes= this.ValidateDiagonals(this.year2Courses);
      this.year3Clashes= this.ValidateDiagonals(this.year3Courses);

    });
    this.newMessage(year); //submits year to view-course component
  }
  newMessage(message:string) {
    this.userService.changeMessage(message)
  }

  displayMissingCourse(): any[]{
    return(this.ValidateCourseRequirements());
  }


  countcoursecredits1(): any[]{
    let counter1:number = 0;
    for (let i =0;i<this.year1Courses.length;i++){
      if (this.year1Courses[i].Year == "1"){
        counter1 += Number(this.year1Courses[i].Credits)
      }
    }
    this.creditCounter1 = counter1;
    return[[this.creditCounter1]]
    //console.log(counter)
  }
  countcoursecredits2(): any[]{
    let counter2:number = 0;
    for (let i =0;i<this.year2Courses.length;i++){
      if (this.year2Courses[i].Year == "2"){
        counter2 += Number(this.year2Courses[i].Credits)
      }
    }
    this.creditCounter2 = counter2;
    return[[this.creditCounter2]]
    //console.log(counter)
  }
  countcoursecredits3(): any[]{
    let counter3:number = 0;
    for (let i =0;i<this.year3Courses.length;i++){
      if (this.year3Courses[i].Year == "3"){
        counter3 += Number(this.year3Courses[i].Credits)
      }
    }
    this.creditCounter3 = counter3;
    return[[this.creditCounter3]]
    //console.log(counter)
  }

  ValidateDiagonals(yearCourse:Course[]) :any{
    let AClashes=[];
    let BClashes=[];
    let CClashes=[];
    let DClashes=[];
    let EClashes=[];
    let PTClashes=[];

    for(let i=0;i<yearCourse.length;++i){
      // console.log('shareable, ',yearCourse[i].Shareable)
      if(yearCourse[i].Slot.includes("A") ){
        AClashes.push(yearCourse[i])
      }
      if(yearCourse[i].Slot.includes("B")){
        BClashes.push(yearCourse[i])
      }
      if(yearCourse[i].Slot.includes("C")){
        CClashes.push(yearCourse[i])
      }
      if(yearCourse[i].Slot.includes("D")){
        DClashes.push(yearCourse[i])
      }
      if(yearCourse[i].Slot.includes("E")){
        EClashes.push(yearCourse[i])
      }
      if(yearCourse[i].Slot.includes("PT")){
        PTClashes.push(yearCourse[i])
      }
    }
    let ACode:String[] = AClashes.map(function(c){return c.Course_Code})

    for(let i =0 ;i<AClashes.length;++i){
      if(ACode.includes(AClashes[i].Shareable) ){
        AClashes = AClashes.slice(0,i).concat(AClashes.slice(i+1))
      }
    }
    let BCode:String[] = BClashes.map(function(c){return c.Course_Code})

    for(let i =0 ;i<BClashes.length;++i){
      if(BCode.includes(BClashes[i].Shareable)){
        BClashes = BClashes.slice(0,i).concat(BClashes.slice(i+1))
      }
    }
    let CCode:String[] = CClashes.map(function(c){return c.Course_Code})

    for(let i =0 ;i<CClashes.length;++i){
      if(CCode.includes(CClashes[i].Shareable) ){//
        CClashes = CClashes.slice(0,i).concat(CClashes.slice(i+1))
      }
    }
    let DCode:String[] = DClashes.map(function(c){return c.Course_Code})

    for(let i =0 ;i<DClashes.length;++i){
      if(DCode.includes(DClashes[i].Shareable)){
        DClashes = DClashes.slice(0,i).concat(DClashes.slice(i+1))
      }
    }
    let ECode:String[] = EClashes.map(function(c){return c.Course_Code})

    for(let i =0 ;i<EClashes.length;++i){
      if(ECode.includes(EClashes[i].Shareable) ){
        EClashes = EClashes.slice(0,i).concat(EClashes.slice(i+1))
      }
    }
    if(AClashes.length===1){
      AClashes.pop();
    }
    if(BClashes.length===1){
      BClashes.pop()
    }
    if(CClashes.length===1){
      CClashes.pop()
    }
    if(DClashes.length===1){
      DClashes.pop()
    }
    if(EClashes.length===1){
      EClashes.pop()
    }
    

    return AClashes.concat(BClashes,CClashes,DClashes,EClashes)
  }
  
  ValidateCourseRequirements(): any[] {
    let PreReqs1:string="";
    let CoReqs1:string="";
    let firstyearcredits:string="";
    let PreReqs2:string="";
    let CoReqs2:string="";
    let PreReqs3:string="";
    let CoReqs3:string="";
    this.MissingFirstYear= [];
    this.MissingSecondYear= [];
    this.MissingThirdYear= [];

    for(let i=0;i<this.year1Courses.length;i++){
      PreReqs1 = PreReqs1.concat(this.year1Courses[i].Pre_requisite)
      CoReqs1 = CoReqs1.concat(this.year1Courses[i].Co_requisite)
      firstyearcredits = firstyearcredits.concat(this.year1Courses[i].Credits)
    }
    let FirstPreReqs:string[] =PreReqs1.split(";");
    let FirstCoReqs:string[] =CoReqs1.split(";");
    let FirstCredits:string[] = firstyearcredits.split(" ");
    FirstPreReqs.pop(); // TO REMOVE LAST EMPTRY ARRAY
    FirstCoReqs.pop(); // TO REMOVE LAST EMPTRY ARRAY
    FirstCredits.pop();


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
    let AllFirstYearCredits:String[] = [];
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

    for(let i=0;i<this.year1Courses.length;i++){ 
      AllFirstYearCredits.push(this.year1Courses[i].Credits)
    }
    
    //first yearchecks
    for(let i=0;i<FirstCoReqs.length;i++){ 
      if(!AllFirstYearCourses.includes(FirstCoReqs[i])){

        if(!this.MissingFirstYear.includes(FirstCoReqs[i])){
          this.MissingFirstYear.push(FirstCoReqs[i])
        }
      }
    }
      //second yearchecks
  
      for(let i=0;i<SecondPreReqs.length;i++){ 
        if(!AllFirstYearCourses.includes(SecondPreReqs[i])){

          if(!this.MissingFirstYear.includes(SecondPreReqs[i])){
            this.MissingFirstYear.push(SecondPreReqs[i])
          }
        }
      }
      for(let i=0;i<SecondCoReqs.length;i++){ 
        if(!AllSecondYearCourses.includes(SecondCoReqs[i])){

          if(!this.MissingSecondYear.includes(SecondCoReqs[i])){
            this.MissingSecondYear.push(SecondCoReqs[i])
          }
        }
      }
          //third yearchecks
  
  for(let i=0;i<ThirdPreReqs.length;i++){ 
    if(!AllSecondYearCourses.includes(ThirdPreReqs[i])){

      if(!this.MissingSecondYear.includes(ThirdPreReqs[i])){
        this.MissingSecondYear.push(ThirdPreReqs[i])
      }
    }
  }
  for(let i=0;i<ThirdCoReqs.length;i++){ 
    if(!AllThirdYearCourses.includes(ThirdCoReqs[i])){

      if(!this.MissingThirdYear.includes(ThirdCoReqs[i])){
        this.MissingThirdYear.push(ThirdCoReqs[i])
      }
    }
  }

  if (this.MissingFirstYear.length === 0){
    this.MissingFirstYear.push("None");
  }

  if (this.MissingSecondYear.length === 0){
    this.MissingSecondYear.push("None");
  }

  if (this.MissingThirdYear.length === 0){
    this.MissingThirdYear.push("None");
  }

  return [this.MissingFirstYear, this.MissingSecondYear, this.MissingThirdYear] // returning the missing year courses for display purposes
 
  }
  
  majors: string[] = [
    'Computer Science Major I', 'Mathematics Major I', 'Physics Major I', 'Computational and Applied Mathematics Major I'
  ]
}


