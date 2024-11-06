import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserhomepageComponent } from './Users/userhomepage/userhomepage.component';
import { SignInUIComponent } from './SignIn/sign-in-ui/sign-in-ui.component';
import { SignUpUIComponent } from './SignUp/sign-up-ui/sign-up-ui.component';
import { AuthGuard } from './AuthGuard/auth.guard';
import { PageNotFoundComponentComponent } from './PageError/page-not-found-component/page-not-found-component.component';
import { TopNavigationComponent } from './Navigation/top-navigation/top-navigation.component';
const routes: Routes = [
  
  { path: 'userhomepage', component: UserhomepageComponent }, // Define the route
  { path: '', redirectTo: 'userhomepage', pathMatch: 'full' },
  { path: 'signUpUI', component: SignUpUIComponent},
  { path: 'signInUI', component: SignInUIComponent},


  {path:'',
    component:TopNavigationComponent,
    canActivate: [AuthGuard],
    children:[
      {
          path: 'topnavigation', component: TopNavigationComponent,
          canActivate: [AuthGuard],
      },
    
    ]
  },
  { path: '**', component: PageNotFoundComponentComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}