import { Routes } from '@angular/router';
import { LoginComponent } from './Login/login.component';
import { AppComponent } from './app.component';
import { MainComponent as StudentMainComponent } from './Students/Main/main.component';
import { MainComponent  as AdminMainComponent} from './Admin/main/main.component';
import { AdminComponent } from './Admin/admin.component';
import { StudentsComponent } from './Students/students.component';
import { TeachersComponent } from './Teachers/teachers.component';
import { AdminGuard } from './core/guards/Admin.guard';
import { StudentsGuard } from './core/guards/Admin.guard';
import { TeachersGuard } from './core/guards/Admin.guard';
import { TeacherManagementComponent } from './Admin/teacher-management/teacher-management.component';
import { StudentManagementComponent } from './Admin/student-management/student-management.component';
import { RatingManagementComponent } from './Admin/rating-management/rating-management.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [


  {path:'login', component:LoginComponent},
  {path:'', redirectTo:'login', pathMatch:'full'},
  {
    path:'Admin', component:AdminComponent,children:[
      { path: '', component: AdminMainComponent },
      {path:'teacher', component: TeacherManagementComponent},
      {path:'student', component: StudentManagementComponent},
      {path:'trating',component:RatingManagementComponent}

    ], canActivate:[AdminGuard]
  },
  {
    path:'Student', component:StudentsComponent,children: [
      { path: '', component: StudentMainComponent }
    ],
     canActivate:[StudentsGuard]
  },
  {
    path:'Teacher', component:TeachersComponent, canActivate:[TeachersGuard]
  },
  {
    path: '**',component:NotFoundComponent
  }
];
