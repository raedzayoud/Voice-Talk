import { Routes } from '@angular/router';
import { Singup } from './auth/singup/singup';
import { Login } from './auth/login/login';
import { Home } from './home/home';
import { Fonctionnalites } from './fonctionnalites/fonctionnalites';
import { Propos } from './propos/propos';
import { Contact } from './contact/contact';
import { Essayer } from './essayer/essayer';

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
  {
    path: 'fonctionnalites',
    component: Fonctionnalites,
  },
  {
    path: 'propos',
    component: Propos,
  },
  {
    path: 'contact',
    component: Contact,
  },
  {
    path: 'essayer',
    component: Essayer,
  },
];
