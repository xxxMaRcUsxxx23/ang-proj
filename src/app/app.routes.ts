import { Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { AboutComponent } from './component/about/about.component';

export const routes: Routes = [
    // {path:'',component: HomeComponent},
    // {path:'about/:id',component:AboutComponent}
    


        // Lazy loading
    {
        path:'',
        loadComponent: ()=> import('./home/home.component').then((c)=>c.HomeComponent),

    }
    ,
    {
        path:'about',
        loadComponent:()=> import('./component/about/about.component').then((c)=>c.AboutComponent),
    },
    {
        path:'admin',
        loadComponent:()=> import('./admin/admin.component').then((c)=>c.AdminComponent),
    },
    {
        path:'courses',
        loadComponent:()=> import('./courses/courses.component').then((c)=>c.CoursesComponent),
    }
];
