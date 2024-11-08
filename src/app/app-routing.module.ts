import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserhomepageComponent } from './Users/userhomepage/userhomepage.component';
import { SignInUIComponent } from './SignIn/sign-in-ui/sign-in-ui.component';
import { SignUpUIComponent } from './SignUp/sign-up-ui/sign-up-ui.component';
import { AuthGuard } from './AuthGuard/auth.guard';
import { PageNotFoundComponentComponent } from './PageError/page-not-found-component/page-not-found-component.component';
import { TopNavigationComponent } from './Navigation/top-navigation/top-navigation.component';
import { SecurityRolesComponent } from './ComponentUI/system/security-roles/security-roles.component';
import { UsersComponent } from './ComponentUI/system/users/users.component';
import { MenuComponent } from './ComponentUI/system/menu/menu.component';
import { ProtectedComponent } from './TermsModal/protected/protected.component';

const routes: Routes = [
  { path: 'homepage', component: UserhomepageComponent },  // Root route
  { path: 'signUpUI', component: SignUpUIComponent },
  { path: 'signInUI', component: SignInUIComponent },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' }, // Default root redirect
  { path: '**', redirectTo: '/homepage' },

  // // Protected route with AuthGuard
  // { 
  //   path: 'protected', 
  //   component: ProtectedComponent, 
  //   canActivate: [AuthGuard] 
  // },

  // Top navigation with sub-routes
  { 
    path: '', 
    component: TopNavigationComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'security', component: SecurityRolesComponent },
      { path: 'user', component: UsersComponent },
      { path: 'menu', component: MenuComponent }
    ]
  },


  
  // Wildcard route for 404 handling
  { path: '**', component: PageNotFoundComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
