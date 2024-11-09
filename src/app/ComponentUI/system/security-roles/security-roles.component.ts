import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SecurityRolesService } from 'src/app/services/Security/security-roles.service';// assuming you have a service for API calls
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-security-roles',
  templateUrl: './security-roles.component.html',
  styleUrls: ['./security-roles.component.css']
})
export class SecurityRolesComponent implements OnInit {
  searchKey: string = '';
  placeHolder: string = 'Search security roles';
  isLoading: boolean = false;
  displayedColumns: string[] = ['id', 'rolecode', 'description', 'created_by', 'updated_by'];
  dataSource = new MatTableDataSource<any>([]);
  csecurityroles: any[];

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
  

  // Function to filter data
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  // Function to clear search
  clearSearch() {
    this.searchKey = '';
    this.applyFilter();
  }


  // Handle 'New' button click (create new role functionality)
  onClickNew(): void {
    // // Show dialog for creating a new role (you can implement a dialog component)
    // const dialogRef = this.dialog.open(NewRoleDialogComponent, {
    //   width: '400px'
    // });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.fetchSecurityRoles(); // Refresh the data after adding a new role
    //   }
    // });
  }

 
}
