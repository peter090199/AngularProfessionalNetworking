import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserhomepageComponent } from './Users/userhomepage/userhomepage.component';
import { MaterialModule } from 'src/Material/Material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './footer/footer.component';
import { SignInUIComponent } from './SignIn/sign-in-ui/sign-in-ui.component';
import { SignUpUIComponent } from './SignUp/sign-up-ui/sign-up-ui.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SuperMasterAdminUIComponent } from './SuperMasterAdmin/super-master-admin-ui/super-master-admin-ui.component';
import { UsersPortalComponent } from './UserInterface/users-portal/users-portal.component';
import { PageNotFoundComponentComponent } from './PageError/page-not-found-component/page-not-found-component.component';
@NgModule({
  declarations: [
    AppComponent,
    UserhomepageComponent,
    FooterComponent,
    SignInUIComponent,
    SignUpUIComponent,
    SuperMasterAdminUIComponent,
    UsersPortalComponent,
    PageNotFoundComponentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSidenavModule,
    FormsModule,
    ToastrModule.forRoot() // Correctly placed ToastrModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
