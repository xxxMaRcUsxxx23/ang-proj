import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CoursesComponent } from '../courses/courses.component';
import { Strings } from '../enum/strings.enum';
import { CourseService } from '../services/course/course.service';
import { Course } from '../interfaces/course.interface';

@Component({

  selector: 'app-admin',
  imports: [FormsModule
    ,//NgIf
    CoursesComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'

})

export class AdminComponent {
  // model = {title:'',description:''} // title/description mei jo bhi enter karenge wo initial value ki tarah show hoga form mei
  // cover!: string | null;
  private courseService = inject(CourseService);
  // cover_file:any;
  // ImgNotPresent:boolean = false;
  model = signal<any>({title:'',description:''});

  cover = signal<string | null>(null);
  cover_file = signal<any>(null);
  ImgNotPresent = signal<boolean>(false);
  // courses : any[] = [];

  ngOnInit(){
    // this.getCourses();

  }

  // getCourses(){
  //   const data = localStorage.getItem(Strings.STORAGE_KEY);
    
  //   console.log(data);
  //   if(data){
  //     this.courses = JSON.parse(data);
  //   }
  // }

  
  onFileSelected(event:any){


    const file = event.target.files[0];
    if(file){
      // this.cover_file = file;
      this.cover_file.set(file);

      const reader = new FileReader();
      reader.onload = () =>{
        const dataUrl = reader.result!.toString();
        // this.cover = dataUrl;
        this.cover.set(dataUrl);
        console.log('image:',this.cover);
      }
      reader.readAsDataURL(file);
      // this.ImgNotPresent = false;
      this.ImgNotPresent.set(false);
    }
    
  }

  onSubmit(form:NgForm){

    if(form.invalid || !this.cover){
      console.log('form invalid');
      form.control.markAllAsTouched(); // -> it will show all the at once on button click
      // this.ImgNotPresent = true;
      this.ImgNotPresent.set(true);
      return;
    }

    console.log(form.value)
    this.saveCourse(form)
  }

  async saveCourse(form: NgForm){
    try {
    const formValue = form.value;
    const data : Course = {
      ...formValue,
      image: this.cover(),
      // id: this.courses.length +1,
    };

    await this.courseService.addCourse(data);
    // console.log(formValue);
    // this.courses = [...this.courses, data];
    // localStorage.setItem(Strings.STORAGE_KEY, JSON.stringify(this.courses) );

    this.clearForm(form);
    } catch (error) {
      console.log(error);
    }
    
  }

  clearForm(form:NgForm){
    form.reset();
    // this.cover = null;
    this.cover.set(null);


    // this.cover_file = null;
    this.cover_file.set(null);
  }

  // deleteCourse(course: any){
  //   // this.courses = this.courses.filter(i => i.id!=course.id);
  //   // localStorage.setItem(Strings.STORAGE_KEY, JSON.stringify(this.courses) );
  // }
}


/**
 * reader.onload: This function runs after the FileReader finishes reading the file.
 * reader.result: Contains the file's data as a Data URL (a base64 string that can be used as an image source).
 * this.cover = dataUrl;: The Data URL is stored in a property called cover, which might be used to display the image in the UI.
 * console.log: The Data URL is logged to the console for debugging.
 * reader.readAsDataURL(file);
  The above command starts the file reading process, converting the file into a Data URL that can be easily used to display images.
 */

