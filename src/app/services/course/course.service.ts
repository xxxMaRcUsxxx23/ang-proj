import { Injectable } from '@angular/core';
import { Strings } from '../../enum/strings.enum';
import { Course } from '../../interfaces/course.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CourseService {


  private courses$ = new BehaviorSubject<Course[]>([]);

  get courses(){ // ye property ki tarah call hoga aur ye eek getter ban jata hai
    return this.courses$.asObservable();// it observes the changes

  }

  constructor() { }


  getCourses():Course[]{

      const data = localStorage.getItem(Strings.STORAGE_KEY);
    console.log(data);
    if(data){

      const courses = JSON.parse(data);
      this.courses$.next(courses);// it updates/notifies changes in values to all the subscribers.
      return courses;
    }
    return [];
      

    
  
  }

  
  addCourse(data: Course){
    const courses = this.courses$.value;
    const newCourses = [...courses,{...data, id:courses.length+1}];
    this.courses$.next(newCourses);

    // save in local storage
    localStorage.setItem(Strings.STORAGE_KEY, JSON.stringify(newCourses) );
    
    return newCourses;
  }


  deleteCourse(data:Course){
    let courses = this.courses$.value;
    courses = courses.filter(i => i.id!= data.id);
    this.courses$.next(courses);// updating my observable as well so that all the subscribers will get notified to it

    localStorage.setItem(Strings.STORAGE_KEY, JSON.stringify(courses) );
  }

}



