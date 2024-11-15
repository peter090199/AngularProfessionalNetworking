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
  lines:any[]=[];

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
  // onCheckboxChange(item: any, event: any): void {
  //   if (event.checked) {
  //    this.selectedMenus.push(item.submenus_id); 
  //    this.selectedMenus.push(item.menus_id);  // Add menus_id when checked
  //   } else {
  //     const index = this.selectedMenus.indexOf(item.menus_id);
  //     if (index > -1) {
  //       this.selectedMenus.splice(index, 1);  // Remove menus_id when unchecked
  //     }
  //   }
  //   console.log('Selected Menus:', this.selectedMenus); // Log the selected menus
  // }

  onCheckboxChange(item: any, submenu: any | null, event: any): void {
    if (submenu) {
      // Submenu checkbox change
      submenu.access = event.checked;
      if (submenu.access) {
        this.selectedMenus.push(submenu.submenus_id); // Add submenu ID when checked
      } else {
        const index = this.selectedMenus.indexOf(submenu.submenus_id);
        if (index > -1) {
          this.selectedMenus.splice(index, 1); // Remove submenu ID when unchecked
        }
      }
      console.log('Submenu ID:', submenu.submenus_id); // Log submenu ID
     // console.log('Submenu Access:', submenu.access); // Log submenu access state
    }
  
    // Main menu checkbox change
    if (item) {
      item.access = event.checked;
      if (item.access) {
        console.log('Menu ID:', item.menus_id); // Log menu ID
        this.selectedMenus.push(item.menus_id); // Add main menu ID when checked
      } else {
        const index = this.selectedMenus.indexOf(item.menus_id);
        if (index > -1) {
          this.selectedMenus.splice(index, 1); // Remove menu ID when unchecked
        }
      }
     // console.log('Menu Access:', item.access); // Log menu access state
    }
  }
  

   
  


  submitData(): void {
    const formData = this.securityRoles.map(role => ({
      rolecode: this.role_code,  
      menus_id: this.selectedMenus.length > 0 ? this.selectedMenus[0] : null, 
      lines: role.submenu || []  
    }));
    // if (this.selectedMenus.length > 0) {
    //   // Prepare the data you want to save, in this case, it's the selected menu IDs
    //   const dataToSave = {
    //     selectedMenus: this.selectedMenus
    //   };
    
  
    console.log('Form submitted with data:', formData);
    
  //   this.loading = true;
  //   this.securityService.submitData(formData).subscribe({
  //     next: (res) => {
  //        if(res.success)
  //         {
  //           this.notificationService.toastrSuccess(res.message);
  //         //  this.ResetForm();
  //           this.loading = false;

  //         }
  //         else{
  //          this.notificationService.toastrError(res.message);
  //           this.loading = false; 
  //         }
     
  //     },
  //     error: (err) => {
  //       this.loading = false;
  //       this.error = 'There was an error submitting the form. Please try again.';
  //       this.notificationService.toastrError(this.error);
  //     }
  //   });
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

