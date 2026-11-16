import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { Profile } from './components/profile/profile';
import { QuizDisplay } from './components/quizdisplay/quizdisplay';
import { Admin } from './components/admin/admin';
import { CreateUser } from './create-user/create-user';
import { CorrectanswersComponent } from './correctanswers/correctanswers';
import { UpdateUser } from './updateuser/updateuser';
import { CreateAdminComponent } from './createadmin/createadmin';

export const routes: Routes = [ 
  { path: '', component: Home },         
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'profile', component: Profile },
  { path: 'quiz/:id', component: QuizDisplay },
  { path: 'admin', component: Admin },
  { path: 'CreateUser', component: CreateUser },
  { path: 'quiz/:id/answers', component: CorrectanswersComponent },
  { path: 'admin/users/updateuser/:id', component: UpdateUser },
  { path: 'CreateAdmin', component: CreateAdminComponent }
];
