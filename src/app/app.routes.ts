import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserComponent } from './pages/user/user.component';
import { authGuard } from './guards/auth.guard';




export const routes: Routes = [
  { path: "", redirectTo: 'login', pathMatch: 'full' },
  { path: "login", component: LoginComponent ,    },
  { path: 'admin', component: AdminComponent , canActivate:[authGuard] , data:{role:"admin"}  },
  {path:'user' , component:UserComponent , canActivate:[authGuard]}
];
