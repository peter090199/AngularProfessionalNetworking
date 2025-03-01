import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/Global/notifications.service';
import { ProfessionalService } from 'src/app/services/SharedServices/professional.service';
import { AddEditLanguageComponent } from '../../ProfessionalDev/Edit/add-edit-language/add-edit-language.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-view-language-ui',
  templateUrl: './view-language-ui.component.html',
  styleUrls: ['./view-language-ui.component.css']
})
export class ViewLanguageUIComponent implements OnInit {
 
  constructor(private language:ProfessionalService,
              private alert:NotificationsService, private dialog:MatDialog,
  ) { }

  formLanguage: any=[];


  
  ngOnInit(): void {
    this.loadData();

  }


  

loadData(){
  this.formLanguage = this.language.getLanguange();


}
  removelanguage(index: number) {
      this.alert.toastrSuccess("Successfuly Deleted!")
      this.formLanguage.splice(index, 1);
    }

  
  editLanguage(index: number): void {
  const Edit = this.formLanguage[index];
  const dialogRef = this.dialog.open(AddEditLanguageComponent, {
    width: '500px',
    data: Edit
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.loadData();
    }
  });
}
}
