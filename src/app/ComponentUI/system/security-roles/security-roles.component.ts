import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SecurityRolesService } from 'src/app/services/Security/security-roles.service';// assuming you have a service for API calls
import { firstValueFrom } from 'rxjs';
import { SecurityRolesUIComponent } from 'src/app/ComponentSharedUI/system/security-roles-ui/security-roles-ui.component';
@Component({
  selector: 'app-security-roles',
  templateUrl: './security-roles.component.html',
  styleUrls: ['./security-roles.component.css']
})
export class SecurityRolesComponent implements OnInit {
  searchKey: string = '';
  placeHolder: string = 'Search security roles';
  isLoading: boolean = false;
  displayedColumns: string[] = ['id', 'rolecode', 'description', 'created_by', 'updated_by','actions'];
  dataSource = new MatTableDataSource<any>([]);
  csecurityroles: any[] = [];

  pageSizeOptions   : number[] = [5, 10, 25, 100];
  success: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private securityRoleService: SecurityRolesService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchSecurityRoles();
  }

  async fetchSecurityRoles(): Promise<void> {
 
    try {
      this.isLoading = true;
        const response = await firstValueFrom(this.securityRoleService.getSecurityRoles());
        if (response.success)
        {
          this.isLoading = true;
          this.success = true;
          this.csecurityroles = response.message; // Assign the fetched data
          console.log(this.csecurityroles)
          this.dataSource.data = this.csecurityroles;
        } 
        else
        {
          console.error('Data fetch unsuccessful');
          this.success = false;
        }
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

    } catch (error) {
      console.error('Error fetching security roles data:', error);
    } finally {
      this.isLoading = false;
    }
  }
  

  applyFilter(){
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }
  clearSearch(){
    this.searchKey = "";
    this.applyFilter();
  }


  // Handle 'New' button click (create new role functionality)
  onClickNew(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    const dialogRef = this.dialog.open(SecurityRolesUIComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchSecurityRoles(); // Refresh the table after dialog closure
      }
    });
  }

   delete(products:any){
  //   if(!products){
  //     this.notificationsService.toastrWarning('No record selected!');
      
  //   }
  //   else{
  //     this.notificationsService.popupWarning(products.productName," "+"Are you sure to delete this product?").then((result) => {
  //       if (result.value) {
  //         this.employeeService.deleteEmployee(products.productId).subscribe({
  //             next:()=>{
  //               this.notificationsService.popupSwalMixin("Successfuly deleted "+ products.productName);
  //               this.loadProducts();
  //             },
  //             error:()=>{
  //               this.notificationsService.toastrError("no product id");
  //               this.loadProducts();
  //             },
  //         });
  //       }
  //     });
  //   }
  }

  edit(element: any): void {
    const dialogRef = this.dialog.open(SecurityRolesUIComponent, {
      width: '400px',
      data: element || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchSecurityRoles();
      }
    });
  }
 
}
