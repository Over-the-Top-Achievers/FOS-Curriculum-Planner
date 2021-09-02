import { ArrayType } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import "node_modules/bootstrap/scss/bootstrap.scss"
import {MatDialog} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material/dialog/dialog-ref';
import { CourseService } from 'src/app/shared/services/course.services';
import {MatTableDataSource} from '@angular/material/table';
import { DegreeName } from 'src/app/shared/models';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.services';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-admin-degree',
  templateUrl: './admin-degree.component.html',
  styleUrls: ['./admin-degree.component.scss']
})
export class AdminDegreeComponent implements OnInit {
  data: DegreeName[] = [];
  dataSource: any = [];
  degree$ = this.courseService.getDegree();


  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    public courseService: CourseService, //dependency injection
    private dialog: MatDialog,
    private http: HttpClient,
    private formbuilder:FormBuilder,
    public userService:UserService
  ) { }

  ngOnInit(): void {
    this.courseService.getDegree().subscribe(
      data => {
        this.dataSource = data as [];
      }
    )
  }

  updateDegreeForm = this.formbuilder.group({
    Degree_Name:'',
    Firm_Offer:'',
    Waitlist:'',
    Reject:''
  });

  populateUpdate(degree:any){
    delete degree._id
    this.updateDegreeForm.setValue(degree)
  }



  updateDegree():void{
    var body=
    {
      newDegree_Name:this.updateDegreeForm.value.Degree_Name, //means never changes the course code right now 
      newFirm_Offer:this.updateDegreeForm.value.Firm_Offer,
      newWaitlist:this.updateDegreeForm.value.Waitlist,
      newReject:this.updateDegreeForm.value.Reject
    };
    this.courseService.updateDegree(body);
    
    //this.updateForm.reset();
  }

  refresh(): void {
    window.location.reload();
  }

}
