import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { SecurityRolesService } from 'src/app/services/Security/security-roles.service';
import { NestedTreeControl } from '@angular/cdk/tree';


interface DialogData {
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

  constructor(
    private securityService: SecurityRolesService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.role_code = data.rolecode;
  }

  ngOnInit(): void {
    this.getSecurityRoles(this.role_code); 
  }
  closeLoading() {
    this.loading = false;
  }
  getSecurityRoles(rolecode: string): void {
    this.loading = true;
    this.securityService.getSecurityRolesByDesc_Code(rolecode).subscribe(
      (datas: any) => {
        this.securityRoles = datas;
        console.log(this.securityRoles)
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
  onCheckboxChange(item: any, event: any) {
    if (item && event) {
      // Safe to access the item.checked property now
      item.selected = event.checked;
    }
  }

}
