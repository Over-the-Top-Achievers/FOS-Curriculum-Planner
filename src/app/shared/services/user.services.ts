import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {

  private messageSource = new BehaviorSubject('{"default":"message"}');
  private courseSource = new BehaviorSubject('{"default":"course"}');
  currentMessage = this.messageSource.asObservable();
  currentCourse = this.courseSource.asObservable();
  constructor() { }

changeMessage(message: string) {
    this.messageSource.next(message)
  }
changeCourse(course:any){
      this.courseSource.next(course);
  }
}