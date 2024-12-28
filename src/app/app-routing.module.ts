import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
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
import { ForgotPasswordUIComponent } from './ComponentSharedUI/forgot-password-ui/forgot-password-ui.component';
import { ResetPasswordUIComponent } from './ComponentSharedUI/reset-password-ui/reset-password-ui.component';
import { ClientUIComponent } from './SignUp/client-ui/client-ui.component';
import { ActivationUIComponent } from './ComponentSharedUI/Activation/activation-ui/activation-ui.component';
import { LayoutComponent } from './layout/layout.component';
import { CurriculumVitaeUIComponent } from './ComponentSharedUI/Individual/curriculum-vitae-ui/curriculum-vitae-ui.component';
import { ProfileUIComponent } from './ComponentSharedUI/Profile/profile-ui/profile-ui.component';
import { UserCVComponent } from './ComponentSharedUI/Individual/user-cv/user-cv.component';
import { UploadProfileComponent } from './ComponentSharedUI/Individual/upload-profile/upload-profile.component';


const routes: Routes = [
  // Public routes

  { path: '', redirectTo: '/homepage', pathMatch: 'full' }, // Default redirect
  { path: 'homepage', component: UserhomepageComponent },
  { path: 'signUpUI', component: SignUpUIComponent },
  { path: 'clientsignup', component: ClientUIComponent },
  { path: 'signInUI', component: SignInUIComponent },
  { path: 'signInUI/:email', component: SignInUIComponent },
  { path: 'forgetpassword', component: ForgotPasswordUIComponent },
  { path: 'reset-password/:email/:token', component: ResetPasswordUIComponent },
  { path: 'activation/:email', component: ActivationUIComponent },
  { path: 'layout', component: LayoutComponent },
  { path: 'curriculum-vitae', component:CurriculumVitaeUIComponent,canActivate:[AuthGuard] },
  //{ path: 'user-cv', component:UserCVComponent,canActivate:[AuthGuard] },
  { path: 'user-cv', component:UserCVComponent},
  { path: 'upload-cv', component:UploadProfileComponent,canActivate:[AuthGuard] },
  
  // Top navigation with sub-routes
  { 
    path: '', 
    component: TopNavigationComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'profile', component:ProfileUIComponent },
      { path: 'home', component: HomeUIComponent },
      { path: 'message', component: MessagesComponent },
    ]
  },
  { 
    path: '', 
    component: TopNavigationComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'security', component: SecurityRolesComponent},
      { path: 'user', component: UsersComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'role', component: RoleComponent },
    ]
  },

  // Wildcard route for 404 handling
  { path: '**', component: PageNotFoundComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
