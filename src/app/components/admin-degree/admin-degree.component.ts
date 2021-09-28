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

import { FormGroup, FormControl } from '@angular/forms';


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
    // this.courseService.getDegree().subscribe(
    //   data => {
    //     this.dataSource = data as [];
    //   }
    // )
  }

  updateDegreeForm = this.formbuilder.group({
    Degree_Name:'',

    fo_maths:'',
    fo_physics:'',
    fo_english:'',
    fo_aps:'',

    wl_maths:'',
    wl_physics:'',
    wl_aps:'',

    r_maths:'',
    r_physics:'',
    r_english:'',
    r_aps:'',
  });

  addDegreeForm = this.formbuilder.group({
    Degree_Name:'',

    fo_maths:'',
    fo_physics:'',
    fo_english:'',
    fo_aps:'',

    wl_maths:'',
    wl_physics:'',
    wl_aps:'',

    r_maths:'',
    r_physics:'',
    r_english:'',
    r_aps:'',
  });


  getDegreeInfo(degree:any){
    var fo = degree.Firm_Offer;
    var wl = degree.Waitlist;
    var r = degree.Reject;

    fo = fo.split(';');
    wl = wl.split(';');
    r = r.split(';');

    var fo_maths = fo[0];
    var fo_physics = fo[1];
    var fo_english = fo[2];
    var fo_aps = fo[3];

    var wl_maths = wl[0];
    var wl_physics = wl[1];
    var wl_aps = wl[2];

    var r_maths = r[0];
    var r_physics = r[1];
    var r_english = r[2];
    var r_aps = r[3];

    this.updateDegreeForm.setValue({
      Degree_Name: degree.Degree_Name,

      fo_maths:fo_maths,
      fo_physics:fo_physics,
      fo_english:fo_english,
      fo_aps:fo_aps,

      wl_maths:wl_maths,
      wl_physics:wl_physics,
      wl_aps:wl_aps,

      r_maths:r_maths,
      r_physics:r_physics,
      r_english:r_english,
      r_aps:r_aps,
    });

  }


  updateDegree():void{
    var new_fo_maths = this.updateDegreeForm.value.fo_maths;
    var new_fo_physics = this.updateDegreeForm.value.fo_physics;
    var new_fo_english = this.updateDegreeForm.value.fo_english;
    var new_fo_aps = this.updateDegreeForm.value.fo_aps;

    var new_fo = new_fo_maths+';'+new_fo_physics+';'+new_fo_english+';'+new_fo_aps

    var new_wl_maths = this.updateDegreeForm.value.wl_maths;
    var new_wl_physics = this.updateDegreeForm.value.wl_physics;
    var new_wl_aps = this.updateDegreeForm.value.wl_aps;

    var new_wl = new_wl_maths+';'+new_wl_physics+';'+new_wl_aps

    var new_r_maths = this.updateDegreeForm.value.r_maths;
    var new_r_physics = this.updateDegreeForm.value.r_physics;
    var new_r_english = this.updateDegreeForm.value.r_english;
    var new_r_aps = this.updateDegreeForm.value.r_aps;

    var new_r = new_r_maths+';'+new_r_physics+';'+new_r_english+';'+new_r_aps

    var body=
    {
      newDegree_Name:this.updateDegreeForm.value.Degree_Name, //means never changes the course code right now 
      newFirm_Offer:new_fo,
      newWaitlist:new_wl,
      newReject:new_r
    };
    this.courseService.updateDegree(body);
  }

  addDegree():void{
    var new_fo_maths = this.addDegreeForm.value.fo_maths;
    var new_fo_physics = this.addDegreeForm.value.fo_physics;
    var new_fo_english = this.addDegreeForm.value.fo_english;
    var new_fo_aps = this.addDegreeForm.value.fo_aps;

    var new_fo = new_fo_maths+';'+new_fo_physics+';'+new_fo_english+';'+new_fo_aps

    var new_wl_maths = this.addDegreeForm.value.wl_maths;
    var new_wl_physics = this.addDegreeForm.value.wl_physics;
    var new_wl_aps = this.addDegreeForm.value.wl_aps;

    var new_wl = new_wl_maths+';'+new_wl_physics+';'+new_wl_aps

    var new_r_maths = this.addDegreeForm.value.r_maths;
    var new_r_physics = this.addDegreeForm.value.r_physics;
    var new_r_english = this.addDegreeForm.value.r_english;
    var new_r_aps = this.addDegreeForm.value.r_aps;

    var new_r = new_r_maths+';'+new_r_physics+';'+new_r_english+';'+new_r_aps

    var body=
    {
      Degree_Name:this.addDegreeForm.value.Degree_Name, //means never changes the course code right now 
      Firm_Offer:new_fo,
      Waitlist:new_wl,
      Reject:new_r
    };

    console.log(body)
    this.courseService.addNewDegree(body);  
  }

  refresh(): void {
    window.location.reload();
  }

}
