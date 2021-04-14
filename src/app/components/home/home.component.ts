import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'FOS-Curriculum-Planner';
  ngOnInit(): void {
  }

  constructor(
      private router:Router,
      private activatedRoute:ActivatedRoute
    ){}

  goToPage(pageName:string):void{
    console.log("Sign in button clicked");  //to see if the button responds correctly
    this.router.navigate(['`${pageName}`']);
  }
}
