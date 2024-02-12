import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home',    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
  },
  /*{
    path: 'page1',    loadChildren: () => import('./page1/page1.component').then( m => m.Page1Component),
  },*/  
  { path: 'page1', component: Page1Component },
  { path: 'page2', component: Page2Component },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
