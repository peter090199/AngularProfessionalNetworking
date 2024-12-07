import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'src/Material/Material.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';

// Translate module imports
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CookieService } from 'ngx-cookie-service';
// Component declarations
import { FooterComponent } from './footer/footer.component';
import { SignInUIComponent } from './SignIn/sign-in-ui/sign-in-ui.component';
import { SignUpUIComponent } from './SignUp/sign-up-ui/sign-up-ui.component';
import { PageNotFoundComponentComponent } from './PageError/page-not-found-component/page-not-found-component.component';
import { TopNavigationComponent } from './Navigation/top-navigation/top-navigation.component';
import { TermsModalComponent } from './TermsModal/terms-modal/terms-modal.component';
import { PrivacyComponent } from './TermsModal/privacy/privacy.component';
import { SecurityRolesComponent } from './ComponentUI/system/security-roles/security-roles.component';
import { UsersComponent } from './ComponentUI/system/users/users.component';
import { ChatUIComponent } from './chat-ui/chat-ui.component';
import { RoleComponent } from './ComponentUI/system/role/role.component';
import { HomeUIComponent } from './ComponentUI/home/home-ui/home-ui.component';
import { SecurityRolesUIComponent } from './ComponentSharedUI/system/security-roles-ui/security-roles-ui.component';
import { MenuUIComponent } from './ComponentSharedUI/system/menu-ui/menu-ui.component';
import { RoleUIComponent } from './ComponentSharedUI/system/role-ui/role-ui.component';
import { MenuComponent } from './ComponentUI/system/menu/menu.component';
import { MessagesComponent } from './ComponentUI/messages/messages.component';
import { MessagesUIComponent } from './ComponentSharedUI/messages-ui/messages-ui.component';
import { DashboardUIComponent } from './ComponentSharedUI/dashboard-ui/dashboard-ui.component';
import { DashboardComponent } from './ComponentUI/dashboard/dashboard.component';
import { ForgotPasswordUIComponent } from './ComponentSharedUI/forgot-password-ui/forgot-password-ui.component';
import { ResetPasswordUIComponent } from './ComponentSharedUI/reset-password-ui/reset-password-ui.component';
import { ExpiredLinkDialogComponent } from './ComponentSharedUI/expired-link-dialog/expired-link-dialog.component';
import { ClientUIComponent } from './SignUp/client-ui/client-ui.component';

import { UserhomepageComponent } from './Users/userhomepage/userhomepage.component';
import { TranslateComponent } from './translate/translate.component';
import { CookiesUIComponent } from './cookies/cookies-ui/cookies-ui.component';
import { ActivationUIComponent } from './ComponentSharedUI/Activation/activation-ui/activation-ui.component';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FeedComponent } from './layout/feed/feed.component';
import { ProfileComponent } from './layout/profile/profile.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { environment } from '../environments/environment';
import { CurriculumVitaeUIComponent } from './ComponentSharedUI/Individual/curriculum-vitae-ui/curriculum-vitae-ui.component';
import { ProfileUIComponent } from './ComponentSharedUI/Profile/profile-ui/profile-ui.component';
import { UserCVComponent } from './ComponentSharedUI/Individual/user-cv/user-cv.component';

// Loader function for TranslateHttpLoader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    UserhomepageComponent,
    FooterComponent,
    SignInUIComponent,
    SignUpUIComponent,
    PageNotFoundComponentComponent,
    TopNavigationComponent,
    TermsModalComponent,
    PrivacyComponent,
    SecurityRolesComponent,
    UsersComponent,
    ChatUIComponent,
    RoleComponent,
    HomeUIComponent,
    SecurityRolesUIComponent,
    MenuUIComponent,
    RoleUIComponent,
    MenuComponent,
    MessagesComponent,
    MessagesUIComponent,
    DashboardUIComponent,
    DashboardComponent,
    ForgotPasswordUIComponent,
    ResetPasswordUIComponent,
    ExpiredLinkDialogComponent,
    ClientUIComponent,
    TranslateComponent,
    CookiesUIComponent,
    ActivationUIComponent,
    LayoutComponent,
    SidebarComponent,
    FeedComponent,
    ProfileComponent,
    TopbarComponent,
    CurriculumVitaeUIComponent,
    ProfileUIComponent,
    UserCVComponent,
    
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
    ToastrModule.forRoot(), // Correctly placed ToastrModule
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
     }),
// ServiceWorkerModule.register('ngsw-worker.js', {
//   enabled: environment.production,
//   // Register the ServiceWorker as soon as the application is stable
//   // or after 30 seconds (whichever comes first).
//   registrationStrategy: 'registerWhenStable:30000'
// })
    
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
