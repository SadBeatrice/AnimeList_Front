import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { loginGuard } from './auth/login.guard';

import { AnimeslistComponent } from './components/animes/animeslist/animeslist.component';
import { AnimesdetailsComponent } from './components/animes/animesdetails/animesdetails.component';

import { StudioslistComponent } from './components/studios/studioslist/studioslist.component';
import { StudiosdetailsComponent } from './components/studios/studiosdetails/studiosdetails.component';

import { CategorieslistComponent } from './components/categories/categorieslist/categorieslist.component';
import { CategoriesdetailsComponent } from './components/categories/categoriesdetails/categoriesdetails.component';


export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  {
    path: "admin", component: PrincipalComponent, canActivate: [loginGuard],children: [
      { path: "animes", component: AnimeslistComponent },
      { path: "animes/new", component: AnimesdetailsComponent },
      { path: "animes/edit/:id", component: AnimesdetailsComponent },

      { path: "studios", component: StudioslistComponent },
      { path: "studios/new", component: StudiosdetailsComponent },
      { path: "studios/edit/:id", component: StudiosdetailsComponent },

      { path: "categories", component: CategorieslistComponent },
      { path: "categories/new", component: CategoriesdetailsComponent },
      { path: "categories/edit/:id", component: CategoriesdetailsComponent },
    ]
  }
];
