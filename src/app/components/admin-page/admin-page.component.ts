import { ArrayType } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import "node_modules/bootstrap/scss/bootstrap.scss"
import {MatDialog} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material/dialog/dialog-ref';
import {API} from '../../shared/services/api'
import { CourseService } from 'src/app/shared/services/course.services';
import {MatTableDataSource} from '@angular/material/table';
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

  displayedColumns: string[] = ['Course_Code', 'Course_Name', 'Credits', 'NQF', 'Slot',
                                        'Semester','Year', 'Co_requisite', 'Pre_requisite'];
  dataSource: any = [];
  dataSource2: any = [];
  yearCourses: any = [];

  data: Course[] = [];
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
    //private api: API
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
    
    this.http.get('http://localhost:8080/coursesData').subscribe(
      data => {
        this.dataSource = data as Course[];
        console.log(this.dataSource)
      }
    )
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

  refresh(): void {
    window.location.reload();
}


  close(){    
    console.log('Close button clicked');
    window.location.reload();
  }

  years: string[] = [
    'First year',
    'Second Year',
    'Third Year'
  ];

  
  applyFilter(event: Event) {
    //this.dataSource = new MatTableDataSource(this.dataSource)
    this.http.get('http://localhost:8080/coursesData').subscribe(
      data => {
        this.dataSource = data as Course[];
        //this.dataSource2 = data as Course[];

        this.dataSource = new MatTableDataSource(this.dataSource)
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

      }
    )
    
    //console.log(this.dataSource[0].Course_Code)
  }

  selectedYear?:string
  displayYearCourse(year: string){
    
    this.http.get('http://localhost:8080/coursesData').subscribe(
      data => {
        console.log(this.yearCourses.length)

        this.dataSource = data as Course[];
        this.dataSource2 = data as Course[];

        this.selectedYear = year
        this.yearCourses = []
        if(this.selectedYear === this.years[0]){
          for(var i = 0; i < (this.dataSource2).length; i++){
            if(this.dataSource2[i].Year === '1'){
              this.yearCourses.push(this.dataSource2[i]);
            }
          } 
        }

        if(this.selectedYear === this.years[1]){
          for(var i = 0; i < (this.dataSource2).length; i++){
            if(this.dataSource2[i].Year === '2'){
              this.yearCourses.push(this.dataSource2[i]);
            }
          } 
        }

        if(this.selectedYear === this.years[2]){
          for(var i = 0; i < (this.dataSource2).length; i++){
            if(this.dataSource2[i].Year === '3'){
              this.yearCourses.push(this.dataSource2[i]);
            }
          } 
        }

        this.yearCourses = new MatTableDataSource(this.yearCourses)
        this.dataSource = this.yearCourses;

        console.log(this.yearCourses)

      }
    )
  }
}
