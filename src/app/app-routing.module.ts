import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserhomepageComponent } from './Users/userhomepage/userhomepage.component';
import { SignInUIComponent } from './SignIn/sign-in-ui/sign-in-ui.component';
import { SignUpUIComponent } from './SignUp/sign-up-ui/sign-up-ui.component';
const routes: Routes = [
  
  { path: 'userhomepage', component: UserhomepageComponent }, // Define the route
  { path: '', redirectTo: 'userhomepage', pathMatch: 'full' },
  {path: 'signUpUI', component: SignUpUIComponent},
  {path: 'signInUI', component: SignInUIComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}