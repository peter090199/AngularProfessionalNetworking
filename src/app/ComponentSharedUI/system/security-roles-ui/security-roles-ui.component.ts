import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SecurityRolesService } from 'src/app/services/Security/security-roles.service';
import { NotificationsService } from 'src/app/services/Global/notifications.service';

interface DialogData {
  menus_id: number;
  submenu: any[];
  id: number;
  rolecode: string;
}

@Component({
  selector: 'app-security-roles-ui',
  templateUrl: './security-roles-ui.component.html',
  styleUrls: ['./security-roles-ui.component.css']
})
export class SecurityRolesUIComponent implements OnInit {
  isLoading = false;
  role_code: string;
  securityRoles: any[] = [];
  loading: boolean = false;
  error: string | null = null;
  response: any;
  menus_id: number;
  selectedMenus: number[] = []; 

  constructor(
    private securityService: SecurityRolesService,
    private notificationService:NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.role_code = data.rolecode;
 
  }

  ngOnInit(): void {
    this.getSecurityRoles(this.role_code);
  }

  closeLoading(): void {
    this.loading = false;
  }

  getSecurityRoles(rolecode: string): void {
    this.loading = true;
    this.securityService.getSecurityRolesByDesc_Code(rolecode).subscribe(
      (datas: any) => {
        this.securityRoles = datas;
        console.log(this.securityRoles);
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching security roles:', error);
        this.error = 'Failed to load security roles';
        this.loading = false;
      }
    );
  }

  toggleSubMenu(menu: any): void {
    menu.expanded = !menu.expanded;
  }

  // onCheckboxChange(item: any, event: any): void {
  //   if (item && event) {
  //     item.selected = event.checked;  // Update the selected state
  //   }
  // }
  onCheckboxChange(item: any, event: any): void {
    if (event.checked) {
      this.selectedMenus.push(item.menus_id);  // Add menus_id when checked
    } else {
      const index = this.selectedMenus.indexOf(item.menus_id);
      if (index > -1) {
        this.selectedMenus.splice(index, 1);  // Remove menus_id when unchecked
      }
    }
    console.log('Selected Menus:', this.selectedMenus); // Log the selected menus
  }

  submitData(): void {

    const formData = this.securityRoles.map(role => ({
      rolecode: this.role_code,    // Send rolecode as part of the formData
      menus_id: this.selectedMenus.length > 0 ? this.selectedMenus[0] : null,  // Use the first selected menu_id, or null if none selected
      lines: role.submenu || []     // Ensure lines is an array (even if empty)
    }));
    
  //  console.log('formData',  formData);  // Log to check the structure

    this.loading = true;
    this.securityService.submitData(formData).subscribe({
      next: (res) => {
         if(res.success)
          {
            this.notificationService.toastrSuccess(res.message);
          //  this.ResetForm();
            this.loading = false;

          }
          else{
           this.notificationService.toastrError(res.message);
            this.loading = false; 
          }
     
      },
      error: (err) => {
        this.loading = false;
        this.error = 'There was an error submitting the form. Please try again.';
        this.notificationService.toastrError(this.error);
      }
    });
  }
}

  // private prepareFormData(): any {
  //   // Prepare the data to be submitted with rolecode, menus_id, and lines
  //   // const data = {
  //   //   roles: this.securityRoles.map(role => ({
  //   //     rolecode: this.role_code,  // Ensure rolecode is included
  //   //     menus_id: 1,   // Ensure menus_id is included
  //   //     lines: role.lines || []    // Ensure lines is included (default to empty array if undefined)
  //   //   }))
  //   // };


  //   return data;
  // }

