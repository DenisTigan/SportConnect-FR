import { Routes } from '@angular/router';

import { Home }
from './pages/home/home';

import { SportVenues }
from './pages/sport-venues/sport-venues';

import { SportDetails }
from './pages/sport-details/sport-details';

import { LoginComponent }
from './components/login/login';

import { Partner }
from './pages/partner/partner';

import { MyAccount }
from './pages/my-account/my-account';

export const routes: Routes = [

  {
    path: '',
    component: Home
  },

  {
    path: 'partner',
    component: Partner
  },

  {
    path: 'account',
    component: MyAccount
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
    path: 'login',
    component: LoginComponent
  }

];