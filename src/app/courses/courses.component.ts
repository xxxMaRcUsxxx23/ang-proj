import { Component, computed, EventEmitter, inject, Input, Output, SecurityContext, signal } from '@angular/core';
import { Strings } from '../enum/strings.enum';
import { Course } from '../interfaces/course.interface';
import { CourseService } from '../services/course/course.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-courses',
  imports: [],

  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})

export class CoursesComponent {
  
  // @Input() courses : any;

  // courses: Course[] =[];
  courses = signal<Course[]>([]); // yaha courses eek function ban gaya hai
  @Input() isDelete = false;
  // @Output() del = new EventEmitter();
  coursesSub!: Subscription;
  private courseService = inject(CourseService);
  // private sanitizer = inject(DomSanitizer);
  // without signals
  a = 1;
  b = 2;

  c = this.a + this.b;

    // with signals (writable signal functions)
    a1 = signal(1);
    b1 = signal(2);
    c1 = computed(() => this.a1() + this.b1()); // computed eek function hai jiske andar callback aata hai aur uss call back ke andar apni functionality likhni hai
    // computed signal sirf read only hota hai.....yaha pe jo bhi chnages hoga usse ham sirf detect kar sakte hai
  deleteCourse(course:Course){
    // this.del.emit(course);
    this.courseService.deleteCourse(course);
  }

  ngOnInit(){

    this.understandSignalUsageWithExample();
    // this.getCourses();
    // this.courses = this.courseService.getCourses();
    this.courses.set(this.courseService.getCourses());
    this.coursesSub = this.courseService.courses.subscribe({
      next : (valueReceived) =>{
        // this.courses = valueReceived;
        this.courses.set(valueReceived);
        console.log(this.courses());
      },
      error : (e)=>{
        console.log(e);
      }
    });// next ke andar response milta hai aur agar koi error aaye toa error waali property se use console log karna hoga
    // unsubscribe karna jaroori hai kyu ki memory leak bhi ho sakta hai -> performance degrade karega application mei 


  }

  ngOnDestroy(){
    if(this.coursesSub)this.coursesSub.unsubscribe();
  }

  understandSignalUsageWithExample() {
    // without signals
    console.log('c before value change: ', this.c);
    this.a = 4;
    console.log('c after value change: ', this.c);

    // with signals
    console.log('c1 before value change: ', this.c1());
    this.a1.set(4);
    console.log('c1 after value change: ', this.c1());
  }


  // sanitizeUrl(value: string){

  //   return this.sanitizer.sanitize(SecurityContext.URL, value) || null;
  // }

  // getCourses(){
  //   const data = localStorage.getItem(Strings.STORAGE_KEY);
    
  //   console.log(data);
  //   if(data){
  //     this.courses = JSON.parse(data);
  //   }
  // }
  // The line this.del.emit(this.course); is used to send data (course) from a child component to a parent component when an event occurs, 
  // typically for event handling such as deletion.
  /**
   * What Happens?
The app-course-item component renders each course with a delete button.
When a user clicks the button, onDelete() is triggered.
this.del.emit(this.course) sends the course object to the parent.
The parent component listens to the del event and removes the course from the list. */ 
}
