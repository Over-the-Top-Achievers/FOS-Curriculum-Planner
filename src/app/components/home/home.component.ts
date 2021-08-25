import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthenticationService } from '../../services';
import { ComponentBase } from '../component-base';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends ComponentBase implements OnInit {
  title = 'FOS-Curriculum-Planner';
  currentUser: any;

  ngOnInit(): void {
  }

}
