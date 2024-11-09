import { Component, OnInit, Inject } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { SecurityRolesService } from 'src/app/services/Security/security-roles.service';

interface MenuNode {
  description: string;
  access: boolean;
  submenu?: MenuNode[];
}

interface FlatMenuNode {
  expandable: boolean;
  description: string;
  level: number;
  access: boolean;
}

@Component({
  selector: 'app-security-roles-ui',
  templateUrl: './security-roles-ui.component.html',
  styleUrls: ['./security-roles-ui.component.css']
})
export class SecurityRolesUIComponent implements OnInit {
  isLoading = false;
  role_code: string;
  treeData: MenuNode[] = [];
  desc_code: any=[];
  
  constructor(
    private securityService: SecurityRolesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.role_code = data.rolecode;
   

  }

  ngOnInit(): void {
    this.fetchSecurityRoles();
  }

  async fetchSecurityRoles(): Promise<void> {
    try {
      this.isLoading = true;
      const res = await firstValueFrom(this.securityService.getSecurityRolesByDesc_Code(this.role_code));
      if (res && res.length > 0) {
        this.treeData = res[0].datas;
        this.desc_code = res[0].desc_code;
      //  console.log(this.treeData)
        this.dataSource.data = this.treeData;
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      this.isLoading = false;
    }
  }

  // saveChanges() {
  //   console.log('Saving changes...', this.dataSource.data);

  //   this.securityService.updateRoles(this.dataSource.data).subscribe({
  //     next: () => {
  //       console.log('Changes saved successfully');
  //       this.dialogRef.close(true);
  //     },
  //     error: (err) => {
  //       console.error('Error saving changes', err);
  //     }
  //   });
  // }

  toggleAccess(node: FlatMenuNode): void {
    node.access = !node.access;
    this.treeControl.getDescendants(node).forEach(child => (child.access = node.access));
  }
  
  private transformer = (node: MenuNode, level: number): FlatMenuNode => ({
    expandable: !!node.submenu && node.submenu.length > 0,
    description: node.description,
    level,
    access: node.access
  });

  treeControl = new FlatTreeControl<FlatMenuNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.submenu
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: FlatMenuNode) => node.expandable;

}
