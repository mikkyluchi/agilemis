import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';

import { LoginComponent } from './login/login.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AnalyticsdashboardonlyComponent } from './analyticsdashboardonly/analyticsdashboardonly.component';


const routes: Routes = [
  { path: 'login',component:LoginComponent },
  { path: 'privacy-policy',component:PrivacyPolicyComponent },
  { path: 'analysis',component:AnalyticsdashboardonlyComponent },
  {
    path: '',
    loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then( m => m.AdminLayoutModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
