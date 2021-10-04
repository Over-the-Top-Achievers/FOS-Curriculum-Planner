import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/shared/models';
import { CourseService } from 'src/app/shared/services/course.services';
import { UserService } from 'src/app/shared/services/user.services';
//import {UserPageComponent} from 'src/app/components/user-page/user-page.component'

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss']
})
export class ViewCourseComponent implements OnInit {
  dataSource: any;
  filteredData: Course[] = [];
  displayedColumns: string[] = ['select','Course_Code', 'Course_Name', 'Credits', 'NQF', 'Slot','Semester','Year', 'Co_requisite', 'Pre_requisite'];
  yearCourses: any;

  years: string[] = ['1','2','3'];

  selectedYear:string | undefined;
  subscription: Subscription | undefined;
  selection = new SelectionModel<String>(true, []);
  givenSelectionFromMessage: Course[] = [];
  constructor(
    public dialogRef: MatDialogRef<ViewCourseComponent>,
    public courseService:CourseService,
    public userService:UserService,){}
    //public oldSelected: UserPageComponent) {}

    ngOnInit() {
      this.subscription = this.userService.currentMessage.subscribe( (message:any) =>{
        message = JSON.parse(message)
        // this.selectedYear = message;
        // console.log(typeof(message));
        this.selectedYear = message.year;
        console.log('view course selection',message.selection);
        this.givenSelectionFromMessage = message.selection;
        
      })
      this.applyFilter("");
    
    }
  close(): void {
    this.dialogRef.close();
  }

  applyFilter(event: any) {

   this.courseService.getCourses().subscribe(
      data => {
        // let filteredData;
        if(this.selectedYear!='0'){
          this.filteredData = data.filter((t: any)=>t.Year ===this.selectedYear)
        }
        else{
          this.filteredData = data
        }
        

        this.dataSource = this.filteredData as Course[];
        this.dataSource = new MatTableDataSource(this.dataSource)
        let filterValue;
        if(event.target){
          filterValue = (event.target as HTMLInputElement).value;
        }else{
          filterValue =""
        }
        this.dataSource.filter = filterValue.trim().toLowerCase();
        // setTimeout(()=>{
        // // console.log('72 view course',this.givenSelectionFromMessage);
          for (let i=0 ; i< this.givenSelectionFromMessage.length;i++){
            this.selection.toggle(this.givenSelectionFromMessage[i].Course_Code);
          }
        // },5000);

        // this.selection.toggle(
        //   {
        //     _id: "60c770194d5bf927783f1599",
        //     Course_Code: "COMS1015A",
        //     Course_Name: "Basic Computer Organisation I",
        //     Credits: "9",
        //     NQF: "5",
        //     Slot: "A",
        //     Semester: "1",
        //     Year: "1",
        //     Co_requisite: "MATH1036A;MATH1034A",
        //     Pre_requisite: "",
        //     Shareable: "COMS1018A"
        //   }
        // );
        // var test =this.selection.isSelected(
        //   {
        //     _id: "60c770194d5bf927783f1599",
        //     Course_Code: "COMS1015A",
        //     Course_Name: "Basic Computer Organisation I",
        //     Credits: "9",
        //     NQF: "5",
        //     Slot: "A",
        //     Semester: "1",
        //     Year: "1",
        //     Co_requisite: "MATH1036A;MATH1034A",
        //     Pre_requisite: "",
        //     Shareable: "COMS1018A"
        //   }
        // );
        // console.log("test 106",test);
        // this.dataSource.Year.filter= this.selectedYear;
      }
    )

  }

  selectedArray():String[]{
    return(this.selection.selected);
  }

  submitSelection():void {
    // let selection = this.selection.selected.slice(1,this.selection.selected.length);
    // console.log(selection);
    // this.userService.changeCourse(selection);
    // const data = this.dataSource as Course[];
    // console.log(data)
    let selection = this.filteredData.filter((v)=>{return this.selection.selected.includes(v.Course_Code)});
    this.userService.changeCourse(selection);
    // console.log(this.oldSelected.SelectedFirstYearCourses)
    this.close()
  }
  // addCourse(course:any){
  //   this.userService.changeCourse(course);
  // }
  displayYearCourse(year: string){

  }
}
