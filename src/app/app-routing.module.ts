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
 
  { path: 'home', loadChildren: () => import('./Users/userhomepage/userhomepage.component').then(m => m.UserhomepageComponent) },
  { path: 'about', loadChildren: () => import('./SignUp/sign-up-ui/sign-up-ui.component').then(m => m.SignUpUIComponent) },

  { path: 'userhomepage', component: UserhomepageComponent }, // Define the route
  { path: '/*', redirectTo: 'topnavigation', pathMatch: 'full' },
  { path: 'signUpUI', component: SignUpUIComponent},
  { path: 'signInUI', component: SignInUIComponent},
  { 
    path: 'protected', 
    component: ProtectedComponent, 
    canActivate: [AuthGuard], 

  },

  //test route

   
  //   {path: 'security.index', component: SecurityRolesComponent},
  //   {path: 'user.index', component: UsersComponent},
  //   {path: 'menu.index', component: MenuComponent},

  {path:'topnavigation',
    component:TopNavigationComponent,
    canActivate: [AuthGuard],
    children:[
      {
          path: 'security.index', component: SecurityRolesComponent,
          canActivate: [AuthGuard],
      },
      {
          path: 'user.index', component: UsersComponent,
          canActivate: [AuthGuard],
      },
      {
          path: 'menu.index', component: MenuComponent,
          canActivate: [AuthGuard],
      }
    
    ]
  },
  { path: '**', component: PageNotFoundComponentComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}