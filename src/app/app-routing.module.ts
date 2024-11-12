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
import { RoleComponent } from './ComponentUI/system/role/role.component';
import { HomeUIComponent } from './ComponentUI/home/home-ui/home-ui.component';
import { ProtectedComponent } from './TermsModal/protected/protected.component';
import { MessagesComponent } from './ComponentUI/messages/messages.component';

const routes: Routes = [
  // Public routes
  { path: '', redirectTo: '/homepage', pathMatch: 'full' }, // Default redirect
  { path: 'homepage', component: UserhomepageComponent },
  { path: 'signUpUI', component: SignUpUIComponent },
  { path: 'signInUI', component: SignInUIComponent },

  // Top navigation with sub-routes
  { 
    path: '', 
    component: TopNavigationComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeUIComponent },
      { path: 'message', component: MessagesComponent },
    ]
  },
  { 
    path: '', 
    component: TopNavigationComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'security', component: SecurityRolesComponent },
      { path: 'user', component: UsersComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'role', component: RoleComponent },
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
