import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserhomepageComponent } from './Users/userhomepage/userhomepage.component';
import { SignInUIComponent } from './SignIn/sign-in-ui/sign-in-ui.component';
import { SignUpUIComponent } from './SignUp/sign-up-ui/sign-up-ui.component';
import { SuperMasterAdminUIComponent } from './SuperMasterAdmin/super-master-admin-ui/super-master-admin-ui.component';
import { AuthGuard } from './AuthGuard/auth.guard';
import { PageNotFoundComponentComponent } from './PageError/page-not-found-component/page-not-found-component.component';

const routes: Routes = [
  
  { path: 'userhomepage', component: UserhomepageComponent }, // Define the route
  { path: '', redirectTo: 'userhomepage', pathMatch: 'full' },
  { path: 'signUpUI', component: SignUpUIComponent},
  { path: 'signInUI', component: SignInUIComponent},


  {path:'',
    component:SuperMasterAdminUIComponent,
    canActivate: [AuthGuard],
    children:[
      {
          path: 'master', component: SuperMasterAdminUIComponent,
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