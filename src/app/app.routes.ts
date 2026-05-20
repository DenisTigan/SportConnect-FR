import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { SportVenues } from './pages/sport-venues/sport-venues';
import { SportDetails } from './pages/sport-details/sport-details';
import { LoginComponent } from './components/login/login';

export const routes: Routes = [

  {
    path: '',
    component: Home
  },

  {
    path: 'sport/:category',
    component: SportVenues
  },

  {
    path: 'venue/:id',
    component: SportDetails
  },

  { 
    path: '', 
    component: LoginComponent 
  },

];

