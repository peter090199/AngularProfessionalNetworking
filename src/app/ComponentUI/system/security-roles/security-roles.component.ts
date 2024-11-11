// import { Component, OnInit, ViewChild } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// import { SecurityRolesService } from 'src/app/services/Security/security-roles.service';// assuming you have a service for API calls
// import { firstValueFrom } from 'rxjs';
// import { SecurityRolesUIComponent } from 'src/app/ComponentSharedUI/system/security-roles-ui/security-roles-ui.component';
// @Component({
//   selector: 'app-security-roles',
//   templateUrl: './security-roles.component.html',
//   styleUrls: ['./security-roles.component.css']
// })
// export class SecurityRolesComponent implements OnInit {
//   searchKey: string = '';
//   placeHolder: string = 'Search';
//   isLoading: boolean = false;
//   displayedColumns: string[] = ['id', 'rolecode', 'description', 'created_by', 'updated_by','actions'];
//   dataSource = new MatTableDataSource<any>([]);
//   csecurityroles: any[] = [];

//   pageSizeOptions   : number[] = [5, 10, 25, 100];
//   success: boolean = false;

//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;

//   constructor(private securityRoleService: SecurityRolesService, public dialog: MatDialog) {}

//   ngOnInit(): void {
//     this.fetchSecurityRoles();
//   }

//   async fetchSecurityRoles(): Promise<void> {
 
//     try {
//       this.isLoading = true;
//         const response = await firstValueFrom(this.securityRoleService.getSecurityRoles());
//         if (response.success)
//         {
//           this.isLoading = true;
//           this.success = true;
//           this.csecurityroles = response.message; // Assign the fetched data
//         //  console.log(this.csecurityroles)
//           this.dataSource.data = this.csecurityroles;
//         } 
//         else
//         {
//           console.error('Data fetch unsuccessful');
//           this.success = false;
//         }
//         this.dataSource.paginator = this.paginator;
//         this.dataSource.sort = this.sort;

//     } catch (error) {
//       console.error('Error fetching security roles data:', error);
//     } finally {
//       this.isLoading = false;
//     }
//   }
  

//   applyFilter(){
//     this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
//   }
//   clearSearch(){
//     this.searchKey = "";
//     this.applyFilter();
//   }

 
//   View(): void {
//    this.fetchSecurityRoles(); 
//    }

//   edit(element: any): void {
//     const dialogRef = this.dialog.open(SecurityRolesUIComponent, {
//       width: '95%', // Adjusts the width for responsive screens
//       maxWidth: '400px', // Maximum width on larger screens
//       maxHeight: '90vh', // Makes the dialog scrollable if content exceeds height
//       data: element || null,
//       panelClass: 'scrollable-dialog'
//     });
  
//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.fetchSecurityRoles();
//       }
//     });
//   }
  
 
// }
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SecurityRolesService } from 'src/app/services/Security/security-roles.service';
import { SecurityRolesUIComponent } from 'src/app/ComponentSharedUI/system/security-roles-ui/security-roles-ui.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-security-roles',
  templateUrl: './security-roles.component.html',
  styleUrls: ['./security-roles.component.css']
})
export class SecurityRolesComponent implements OnInit {
  searchKey = '';
  placeHolder: string = 'Search security roles';
  displayedColumns = ['id', 'rolecode', 'description', 'created_by', 'updated_by', 'actions'];
  dataSource = new MatTableDataSource<any>();
  isLoading = false;
  pageSizeOptions = [5, 10, 25, 100];
  csecurityroles:any=[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private securityRoleService: SecurityRolesService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchSecurityRoles();
  }

  async fetchSecurityRoles(): Promise<void> {
    this.isLoading = true;
    try {
      const response = await firstValueFrom(this.securityRoleService.getSecurityRoles());
      if (response.success) {
        this.dataSource.data = response.message;
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      this.isLoading = false;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  View(): void {
    this.fetchSecurityRoles(); 
    }
    
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  clearSearch() {
    this.searchKey = '';
    this.applyFilter();
  }

  refresh() {
    this.fetchSecurityRoles();
  }

  edit(element: any) {
    const dialogRef = this.dialog.open(SecurityRolesUIComponent, {
      width: '400px',
      maxHeight: '90vh',
      data: element,
      panelClass: 'scrollable-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.fetchSecurityRoles();
    });
  }
}
