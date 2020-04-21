import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
// import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';

// import { AuthguardService as AuthGuard } from './services/authguard.service';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }