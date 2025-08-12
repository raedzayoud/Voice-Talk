import { Routes } from '@angular/router';
import { Singup } from './singup/singup';
import { Login } from './login/login';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'singup',
    component: Singup,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'home',
    component: Home,
  },
];
