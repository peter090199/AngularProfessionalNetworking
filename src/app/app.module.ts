import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderPageComponent } from './header-page/header-page.component';

import {ToastrModule} from 'ngx-toastr';
import { MaterialModule } from 'src/Material/Material.module';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FooterPageComponent } from './footer-page/footer-page.component';
import { DashboardUiComponent } from './dashboard-ui/dashboard-ui.component';
import { EmployeesUIComponent } from './Files/componentsUI/employees-ui/employees-ui.component';
import { ClientsComponent } from './Files/components/clients/clients.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { EditEmployeeComponent} from './Files/componentsUI/edit-employees/edit-employee-component';
import { UserRoleComponent } from './Users/componentsTable/user-role.component';
import { UsersUIRoleComponent } from './Users/componentsUI/users-ui-role.component';
import { AccessrightsComponent } from './Users/componentsTable/accessrights.component';
import { MenusTableComponent } from './Users/componentsTable/menus-table.component';
import { MenusUIComponent } from './Users/componentsUI/menus-ui.component';
import { SubModulesUIComponent } from './Users/componentsUI/sub-modules-ui.component';
import { AddMenuUIComponent } from './Users/componentsUI/add-menu-ui/add-menu-ui.component';
import { LandingPageComponent } from './lay-out/landing-page/landing-page.component';
import { UserProfileComponent } from './Profile/ComponentsTable/user-profile/user-profile.component';
import { UserProfileUIComponent } from './Profile/ComponentsUI/user-profile-ui/user-profile-ui.component';
import { ChangePasswordUIComponent } from './Profile/ComponentsUI/change-password-ui/change-password-ui.component';
import { UserPageComponent } from './header-page/user-page/user-page.component';
import { UserMenuPageComponent } from './header-page/user-menu-page/user-menu-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './Home/componentsUI/home/home.component';
import { HomeTableComponent } from './Home/componentsTable/home-table/home-table.component';
import { ProductItemsComponent } from './Files/components/product-items/product-items.component';
import { ProductsUIComponent } from './Files/componentsUI/products-ui/products-ui.component';
import { ProductDetailsComponent } from './Home/componentsUI/product-details/product-details.component';
import { DecimalPipe } from '@angular/common';
import { ViewOrderTableComponent } from './Home/componentsTable/view-order-table/view-order-table.component';
import { CheckOutUIComponent } from './Home/componentsUI/check-out-ui/check-out-ui.component';
import { UserHomepageComponent } from './header-page/user-homepage/user-homepage.component';
import { UserViewProductsComponent } from './header-page/user-homepage/user-view-products/user-view-products.component';
import { ChatUIComponent } from './ChatConvo/chat-ui/chat-ui.component';
import { ProductsTableComponent } from './Inventory/products-table/products-table.component';
import { InventoryProductUIComponent } from './Inventory/inventory-product-ui/inventory-product-ui.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderPageComponent,
    FooterPageComponent,
    DashboardUiComponent,
    EmployeesUIComponent,
    ClientsComponent,
    LoginComponent,
    RegisterComponent,
    EditEmployeeComponent,
    UserRoleComponent,
    UsersUIRoleComponent,
    AccessrightsComponent,
    MenusTableComponent,
    MenusUIComponent,
    SubModulesUIComponent,
    AddMenuUIComponent,
    LandingPageComponent,
    UserProfileComponent,
    UserProfileUIComponent,
    ChangePasswordUIComponent,
    UserPageComponent,
    UserMenuPageComponent,
    HomeComponent,
    HomeTableComponent,
    ProductItemsComponent,
    ProductsUIComponent,
    ProductDetailsComponent,
    ViewOrderTableComponent,
    CheckOutUIComponent,
    UserHomepageComponent,
    UserViewProductsComponent,
    ChatUIComponent,
    ProductsTableComponent,
    InventoryProductUIComponent,
    

    
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ToastrModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    

  ],

  
  providers: [DatePipe, JwtHelperService,DecimalPipe, 
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
  ],
  
  bootstrap: [AppComponent],

})
export class AppModule { }
