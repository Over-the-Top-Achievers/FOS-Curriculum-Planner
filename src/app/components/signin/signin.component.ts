import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {
  title = 'FOS-Curriculum-Planner';

  ngOnInit(): void {
  }

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute
  ){}

  goToAdmin(pageName:string):void{
    console.log("Sign in button clicked");  //to see if the button responds correctly
    this.router.navigate(['`${pageName}`']);
  }
  
}
