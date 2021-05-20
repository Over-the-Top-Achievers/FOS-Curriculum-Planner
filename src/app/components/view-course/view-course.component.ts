import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/shared/models';
import { CourseService } from 'src/app/shared/services/course.services';
import { UserService } from 'src/app/shared/services/user.services';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss']
})
export class ViewCourseComponent implements OnInit {
  dataSource: Course [] = [];
  displayedColumns: string[] = ['select','Course_Code', 'Course_Name', 'Credits', 'NQF', 'Slot','Semester','Year', 'Co_requisite', 'Pre_requisite'];
  yearCourses: any;
  dataSource2: any;
  years: string[] = ['1','2','3'];

  selectedYear:string | undefined;
  subscription: Subscription | undefined;
  selection = new SelectionModel<Course>(true, []);
  constructor(
    public dialogRef: MatDialogRef<ViewCourseComponent>,private courseService:CourseService,private userService:UserService) {}

    ngOnInit() {
      this.subscription = this.userService.currentMessage.subscribe( (message:any) => this.selectedYear = message)
      this.applyFilter("");
    }
  close(): void {
    this.dialogRef.close();
  }

  applyFilter(event: any) {

   this.courseService.getCourses().subscribe(
      data => {
        const filteredData = data.filter((t: any)=>t.Year ===this.selectedYear)

        this.dataSource = filteredData as Course[];

        // this.dataSource = new MatTableDataSource(this.dataSource)
        // const filterValue = (event.target as HTMLInputElement).value; 
        // this.dataSource.filter = filterValue.trim().toLowerCase();
        // this.dataSource.Year.filter= this.selectedYear;
      }
    )

  }
  submitSelection():void {

    this.userService.changeCourse(this.selection.selected);
    this.close()
  }
  // addCourse(course:any){
  //   this.userService.changeCourse(course);
  // }
  displayYearCourse(year: string){

  }
}
