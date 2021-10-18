/* istanbul ignore if  */

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
  message='{}';
  subscription: Subscription | undefined;
  year1Courses: Course[] = [];
  year2Courses: Course[] = [];
  year3Courses: Course[]= [];
  missingPreReqInfo:any= [];// map of course info e.g missingCourseInfo['COMS1015'] gives MATH1036,MATH1034
  missingCoReqInfo:any= [];// map of course info e.g missingCourseInfo['COMS1015'] gives MATH1036,MATH1034

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
  formatRequirementInfo(courseCode:string):string {
    let result:string= "";
    console.log(courseCode)
    
    result = "\nMissing co-requisites: \n"  + this.missingCoReqInfo[courseCode]  +
             "\nMissing pre-requisite: \n" + this.missingPreReqInfo[courseCode] 

    return result;
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
      this.year1Clashes = this.year1Courses
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
      this.year2Clashes = this.year2Courses
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
      this.year3Clashes = this.year3Courses
      this.afterRemoveYear3 = []
    }

    
  }
  ngOnInit(): void {
    this.userService.currentCourse.subscribe((message:any) => {
      let year = JSON.parse(this.message).year;
      // console.log('user page',message);
    if(year =="1"){
      this.year1Courses=message;
    }
    if(year =="2"){
      this.year2Courses=message;
    }
    if(year =="3"){
      this.year3Courses=message;
    }
  //  console.log(this.year1Courses,this.year2Courses,this.year3Courses)
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
      this.validateCourseRequirements();
      this.year1Clashes= this.ValidateDiagonals(this.year1Courses);
      this.year2Clashes= this.ValidateDiagonals(this.year2Courses);
      this.year3Clashes= this.ValidateDiagonals(this.year3Courses);

    });
    // let year = JSON.parse(this.message).year;
    let selection:Course[]=[];
    if(year=="1")
    {
      selection = this.year1Courses;      
    }
    if(year=="2")
    {
      selection = this.year2Courses;      
    }
    if(year=="3")
    {
      selection = this.year3Courses;      
    }
    this.newMessage(year,selection); //submits year to view-course component
  }
  newMessage(year:string,selection:Course[]) {
    // this.userService.changeMessage(year);
    //console.log("aaaaa: " + selection)

    let modified_selection: String[] = selection.map(function(course){
      return course['Course_Code'];
    })
    const message = {year:year,selection:modified_selection};
    //console.log("aaaaa:" + message)
    this.userService.changeMessage(JSON.stringify(message));
    // console.log("ccccccccc: " + JSON.stringify(message))
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

  RemoveDuplicates(courses:Course[]):Course[] {

    let unique:Course[] = [];

    for (var i =0; i < courses.length; i++){

      if (i == 0) {
        unique.push(courses[i]);
        continue;
      }

      var exists = false;
      
      for (var j = 0; j < unique.length; j++) {

        if (courses[i].Course_Code == unique[j].Course_Code){
          exists = true;
          break;
        }

      }

      if (exists == false) {
        unique.push(courses[i]);
      }

    }

    return unique;

  }

  CompareCourses(c1:Course, c2:Course):Boolean {
    
    if (c1.Course_Code == c2.Course_Code) return false;

    if (c1.Semester == c2.Semester || c1.Semester == "FY" || c2.Semester == "FY") {

      var c1Slots = c1.Slot.split('/');
      var c2Slots = c2.Slot.split('/');

      for (var i = 0; i < c1Slots.length; i++) {
        for (var j = 0; j < c2Slots.length; j++) {

          if (c1Slots[i] == c2Slots[j]) {

            if (c1.Shareable.indexOf(c2.Course_Code) != -1 || c2.Shareable.indexOf(c1.Course_Code) != -1) {
              return false;
            }
            else {
              return true;
            }
          }
        }
      }
    }

    return false;

  }

  ValidateDiagonals(yearCourse:Course[]) :any {

    // Courses in the same diagonal which are in the same 
    // semester not shareable with the another 
    // course are clashes.

    let processed: Course[] = [];
    let clashes:Course[] = [];

    for (var i = 0; i < yearCourse.length; i++) {

      // If a course has already been processed 
      // that has a matching semester & slot to
      // the current course, it's a possible clash,
      // so add to clashes
      for( var j = 0; j < processed.length; j++) {
        if (this.CompareCourses(yearCourse[i], processed[j]) == true) {
          clashes.push(yearCourse[i]);
          clashes.push(processed[j]);
          break;
        }
      }

      // Add to processed
      processed.push(yearCourse[i]);
      
    }
    
    clashes = this.RemoveDuplicates(clashes);
    clashes.sort(function(a, b) {
      var textA = a.Course_Code.toUpperCase();
      var textB = b.Course_Code.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  })
    return clashes ;
   
  }
  //returns missing courses for single course 
  checkCourseRequirements(course :Course ,chosenCourses:String[],field:String):String[]{
    let result:String[] = [];
    let req: String[] = []; //doesnt work with or (/) yet
    if(field=="co") {
      req = course.Co_requisite.split(";");
    }
    else if(field == "pre") {
      req = course.Pre_requisite.split(";");
    }
    for (let index = 0; index < req.length; index++) {
      const element = req[index];
      let findIndex = chosenCourses.findIndex(function(value,index) {return value==element});
      if(findIndex==-1){
        result.push(element)
      }
    }
    // console.log('course req',req,chosenCourses);
    return result;
  }
  //fills in missingCourseInfo
  validateCourseRequirements():void {
    this.missingCoReqInfo = [];
    this.missingPreReqInfo = [];
    let chosenFirstYear = this.year1Courses.map(function(value,index) { return value.Course_Code});
    let chosenSecondYear = this.year2Courses.map(function(value,index) { return value.Course_Code});
    let chosenThirdYear = this.year3Courses.map(function(value,index) { return value.Course_Code});

    for(let i=0;i<this.year1Courses.length;i++){
      const co = this.checkCourseRequirements(this.year1Courses[i],chosenFirstYear,"co");
      this.missingCoReqInfo[this.year1Courses[i].Course_Code] = co;
    }
    for(let i=0;i<this.year2Courses.length;i++){ 
      const pre = this.checkCourseRequirements(this.year2Courses[i],chosenFirstYear,"pre");
      const co = this.checkCourseRequirements(this.year2Courses[i],chosenSecondYear,"co");
      this.missingCoReqInfo[this.year2Courses[i].Course_Code] = co;
      this.missingPreReqInfo[this.year2Courses[i].Course_Code] = pre;

    }
    for(let i=0;i<this.year3Courses.length;i++){ 
      // const pre1 = this.checkCourseRequirements(this.year3Courses[i],chosenFirstYear,"pre");
      const pre2 = this.checkCourseRequirements(this.year3Courses[i],chosenSecondYear,"pre");
      const co = this.checkCourseRequirements(this.year3Courses[i],chosenThirdYear,"co");
      this.missingCoReqInfo[this.year3Courses[i].Course_Code] = co;
      this.missingPreReqInfo[this.year3Courses[i].Course_Code] = pre2;
    }
  }
  checkSingleRequirement(courses:String[],requirements:String[]):String[]{
    let missing:String[] = [];
    for(let i=0;i<requirements.length;i++){ 
      if(!courses.includes(requirements[i])){
        let index = missing.findIndex(element => element.includes(requirements[i] as string))
        if(index ===-1){
          missing.push(requirements[i])
        }
        // if(!missing.includes(requirements[i])){
          // missing.push(requirements[i])
        // }
      }
    }
    //console.log(missing)
    return missing;
  }
  ValidateCourseRequirements(): any[] {

    // This method populates the missing courses
    // section on each of the cards.

    // RULES:
    // 1. Co-Requisites that are not in the current list of courses for the year
    // are missing for that year

    // 2. Pre-Requisites that are not in the current list of courses for the 
    // previous year are missing for that year

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
      if(this.year1Courses[i].Pre_requisite[this.year1Courses[i].Pre_requisite.length - 1]!==';'){
        PreReqs1 = PreReqs1.concat(";")
      }
      if(this.year1Courses[i].Co_requisite[this.year1Courses[i]. Co_requisite.length - 1]!==';'){
        CoReqs1 = CoReqs1.concat(";")
      }
      firstyearcredits = firstyearcredits.concat(this.year1Courses[i].Credits)
    }
    let FirstPreReqs:string[] =PreReqs1.split(";");
    let FirstCoReqs:string[] =CoReqs1.split(";");
    let FirstCredits:string[] = firstyearcredits.split(" ");
    if(FirstPreReqs[FirstPreReqs.length -1]===""){
      FirstPreReqs.pop(); // TO REMOVE LAST EMPTRY ARRAY
    }
    if(FirstCoReqs[FirstCoReqs.length -1]===""){
      FirstCoReqs.pop(); // TO REMOVE LAST EMPTRY ARRAY
    }
    FirstCredits.pop();


    for(let i=0;i<this.year2Courses.length;i++){
      PreReqs2 = PreReqs2.concat(this.year2Courses[i].Pre_requisite)
      CoReqs2 = CoReqs2.concat(this.year2Courses[i].Co_requisite)
      if(this.year2Courses[i].Pre_requisite[this.year2Courses[i].Pre_requisite.length - 1]!==';'){
        PreReqs2 = PreReqs2.concat(";")
      }
      if(this.year2Courses[i].Co_requisite[this.year2Courses[i]. Co_requisite.length - 1]!==';'){
        CoReqs2 = CoReqs2.concat(";")
      }
    }
    let SecondPreReqs:string[] =PreReqs2.split(";");
   // console.log(SecondPreReqs)
    let SecondCoReqs:string[] =CoReqs2.split(";");
    if(SecondPreReqs[SecondPreReqs.length -1]===""){
      SecondPreReqs.pop(); // TO REMOVE LAST EMPTRY ARRAY
    }
    if(SecondCoReqs[SecondCoReqs.length -1]===""){
      SecondCoReqs.pop(); // TO REMOVE LAST EMPTRY ARRAY
    }


    for(let i=0;i<this.year3Courses.length;i++){
      PreReqs3 = PreReqs3.concat(this.year3Courses[i].Pre_requisite)
      CoReqs3 = CoReqs3.concat(this.year3Courses[i].Co_requisite)
    }
    let ThirdPreReqs:string[] =PreReqs3.split(";");
    let ThirdCoReqs:string[] =CoReqs3.split(";");
    if(ThirdPreReqs[ThirdPreReqs.length -1]===""){
      ThirdPreReqs.pop(); // TO REMOVE LAST EMPTRY ARRAY
    }
    if(ThirdCoReqs[ThirdCoReqs.length -1]===""){
      ThirdCoReqs.pop(); // TO REMOVE LAST EMPTRY ARRAY
    }

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
    
    this.MissingFirstYear = this.checkSingleRequirement(AllFirstYearCourses,FirstCoReqs); 
    this.MissingFirstYear = this.MissingFirstYear.concat(this.checkSingleRequirement(AllFirstYearCourses,SecondPreReqs));  
    this.MissingSecondYear = this.checkSingleRequirement(AllSecondYearCourses,SecondCoReqs);
    this.MissingSecondYear = this.MissingSecondYear.concat(this.checkSingleRequirement(AllSecondYearCourses,ThirdPreReqs));  
    this.MissingThirdYear = this.checkSingleRequirement(AllThirdYearCourses,ThirdCoReqs);
  if (this.MissingFirstYear.length === 0){
    this.MissingFirstYear.push("None");
  }

  if (this.MissingSecondYear.length === 0){
    this.MissingSecondYear.push("None");
  }

  if (this.MissingThirdYear.length === 0){
    this.MissingThirdYear.push("None");
  }

 // console.log(this.MissingFirstYear)
  return [this.MissingFirstYear, this.MissingSecondYear, this.MissingThirdYear] // returning the missing year courses for display purposes
 
  }
  
  majors: string[] = [
    'Computer Science Major I', 'Mathematics Major I', 'Physics Major I', 'Computational and Applied Mathematics Major I'
  ]
}


