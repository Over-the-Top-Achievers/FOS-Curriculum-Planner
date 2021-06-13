import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-aps-calculator',
  templateUrl: './aps-calculator.component.html',
  styleUrls: ['./aps-calculator.component.scss']
})
export class ApsCalculatorComponent implements OnInit {

  APSform = this.formbuilder.group({
    maths:'',
    english:'',
    lo:'',
    sub1:'',
    sub2:'',
    sub3:'',
    sub4:''
  });

  counter = 0
  

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private formbuilder:FormBuilder,
  ) { 
    
  }

  ngOnInit(): void {
  }

  sumAPS(){
    let count = 0
    // for maths
    if(parseInt(this.APSform.value.maths) > 39 && parseInt(this.APSform.value.maths) < 50){
      count += 3
    }

    else if(parseInt(this.APSform.value.maths) > 49 && parseInt(this.APSform.value.maths) < 60){
      count += 4
    }

    else if(parseInt(this.APSform.value.maths) > 59 && parseInt(this.APSform.value.maths) < 70){
      count += 7
    }

    else if(parseInt(this.APSform.value.maths) > 69 && parseInt(this.APSform.value.maths) < 80){
      count += 8
    }

    else if(parseInt(this.APSform.value.maths) > 79 && parseInt(this.APSform.value.maths) < 90){
      count += 9
    }

    else if(parseInt(this.APSform.value.maths) > 89 && parseInt(this.APSform.value.maths) < 1000){
      count += 10
    }

    // for english
    if(parseInt(this.APSform.value.english) > 39 && parseInt(this.APSform.value.english) < 50){
      count += 3
    }

    else if(parseInt(this.APSform.value.english) > 49 && parseInt(this.APSform.value.english) < 60){
      count += 4
    }

    else if(parseInt(this.APSform.value.english) > 59 && parseInt(this.APSform.value.english) < 70){
      count += 7
    }

    else if(parseInt(this.APSform.value.english) > 69 && parseInt(this.APSform.value.english) < 80){
      count += 8
    }

    else if(parseInt(this.APSform.value.english) > 79 && parseInt(this.APSform.value.english) < 90){
      count += 9
    }

    else if(parseInt(this.APSform.value.english) > 89 && parseInt(this.APSform.value.english) < 1000){
      count += 10
    }

    // for LO
    if(parseInt(this.APSform.value.english) > 59 && parseInt(this.APSform.value.english) < 70){
      count += 1
    }

    else if(parseInt(this.APSform.value.english) > 69 && parseInt(this.APSform.value.english) < 80){
      count += 2
    }

    else if(parseInt(this.APSform.value.english) > 79 && parseInt(this.APSform.value.english) < 90){
      count += 3
    }

    else if(parseInt(this.APSform.value.english) > 89 && parseInt(this.APSform.value.english) < 1000){
      count += 4
    }

    // for other subjects sub1
    if(parseInt(this.APSform.value.sub1) > 39 && parseInt(this.APSform.value.sub1) < 50){
      count += 3
    }

    else if(parseInt(this.APSform.value.sub1) > 49 && parseInt(this.APSform.value.sub1) < 60){
      count += 4
    }

    else if(parseInt(this.APSform.value.sub1) > 59 && parseInt(this.APSform.value.sub1) < 70){
      count += 5
    }

    else if(parseInt(this.APSform.value.sub1) > 69 && parseInt(this.APSform.value.sub1) < 80){
      count += 6
    }

    else if(parseInt(this.APSform.value.sub1) > 79 && parseInt(this.APSform.value.sub1) < 90){
      count += 7
    }

    else if(parseInt(this.APSform.value.sub1) > 89 && parseInt(this.APSform.value.sub1) < 1000){
      count += 8
    }

    // sub2
    if(parseInt(this.APSform.value.sub2) > 39 && parseInt(this.APSform.value.sub2) < 50){
      count += 3
    }

    else if(parseInt(this.APSform.value.sub2) > 49 && parseInt(this.APSform.value.sub2) < 60){
      count += 4
    }

    else if(parseInt(this.APSform.value.sub2) > 59 && parseInt(this.APSform.value.sub2) < 70){
      count += 5
    }

    else if(parseInt(this.APSform.value.sub2) > 69 && parseInt(this.APSform.value.sub2) < 80){
      count += 6
    }

    else if(parseInt(this.APSform.value.sub2) > 79 && parseInt(this.APSform.value.sub2) < 90){
      count += 7
    }

    else if(parseInt(this.APSform.value.sub2) > 89 && parseInt(this.APSform.value.sub2) < 1000){
      count += 8
    }

    // sub3
    if(parseInt(this.APSform.value.sub3) > 39 && parseInt(this.APSform.value.sub3) < 50){
      count += 3
    }

    else if(parseInt(this.APSform.value.sub3) > 49 && parseInt(this.APSform.value.sub3) < 60){
      count += 4
    }

    else if(parseInt(this.APSform.value.sub3) > 59 && parseInt(this.APSform.value.sub3) < 70){
      count += 5
    }

    else if(parseInt(this.APSform.value.sub3) > 69 && parseInt(this.APSform.value.sub3) < 80){
      count += 6
    }

    else if(parseInt(this.APSform.value.sub3) > 79 && parseInt(this.APSform.value.sub3) < 90){
      count += 7
    }

    else if(parseInt(this.APSform.value.sub3) > 89 && parseInt(this.APSform.value.sub3) < 1000){
      count += 8
    }

    // sub4
    if(parseInt(this.APSform.value.sub4) > 39 && parseInt(this.APSform.value.sub4) < 50){
      count += 3
    }

    else if(parseInt(this.APSform.value.sub4) > 49 && parseInt(this.APSform.value.sub4) < 60){
      count += 4
    }

    else if(parseInt(this.APSform.value.sub4) > 59 && parseInt(this.APSform.value.sub4) < 70){
      count += 5
    }

    else if(parseInt(this.APSform.value.sub4) > 69 && parseInt(this.APSform.value.sub4) < 80){
      count += 6
    }

    else if(parseInt(this.APSform.value.sub4) > 79 && parseInt(this.APSform.value.sub4) < 90){
      count += 7
    }

    else if(parseInt(this.APSform.value.sub4) > 89 && parseInt(this.APSform.value.sub4) < 1000){
      count += 8
    }

    console.log(count)
    this.counter = count
  }
}
