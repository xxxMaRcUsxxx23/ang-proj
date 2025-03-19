import { Component } from '@angular/core';
import { CoursesComponent } from '../courses/courses.component';
// import { Strings } from '../enum/strings.enum';
import { AboutComponent } from "../component/about/about.component";

@Component({
  selector: 'app-home',
  imports: [CoursesComponent, AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'

})

export class HomeComponent {
  // courses : any[] = [];



// start form here

  ngOnInit(){
    // this.getCourses();
  
  }

// getCourses(){
//     const data = localStorage.getItem(Strings.STORAGE_KEY);
    
//     console.log(data);
//     if(data){
//       this.courses = JSON.parse(data);
//     }
//   }

  
  
}

