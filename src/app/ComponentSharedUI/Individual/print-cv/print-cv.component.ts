import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-print-cv',
  templateUrl: './print-cv.component.html',
  styleUrls: ['./print-cv.component.css']
})
export class PrintCVComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }
  fullName = 'John Doe';
  email = 'johndoe@example.com';
  phone = '+1234567890';

  skills = ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS'];

  educationList = [
    { degree: 'Bachelor of Science in Computer Science', institution: 'XYZ University', year: '2015 - 2019' },
    { degree: 'Master of Software Engineering', institution: 'ABC Institute', year: '2020 - 2022' }
  ];

  experienceList = [
    { 
      role: 'Software Engineer', 
      company: 'TechCorp Inc.', 
      duration: '2020 - Present', 
      description: 'Developing modern web applications using Angular and TypeScript.' 
    },
    { 
      role: 'Junior Developer', 
      company: 'CodeWorks LLC', 
      duration: '2019 - 2020', 
      description: 'Assisted in building responsive websites using JavaScript frameworks.' 
    }
  ];
  isVisible = true;
  closeLayout() {
    // Logic to close the layout
    console.log('Close button clicked');
    // Optionally hide or destroy the element
  }
  closeForm() {
  
    }
  
  closeContainer() {
    this.isVisible = false; // Hide the container when close icon is clicked
  }
  dataSource = [
    { item: 'Project A', quantity: 'Completed', price: 'N/A' },
  ];

  displayedColumns: string[] = ['item', 'quantity', 'price'];

  printLayout() {
    const printContents = document.getElementById('printSection')?.innerHTML;
    const popupWin = window.open('', '_blank', 'width=800,height=600');
    popupWin?.document.open();
    popupWin?.document.write(`
      <html>
        <head>
          <title>Print Resume</title>
          <style>
            body { font-family: Verdana, sans-serif; margin: 0; padding: 20px; }
            .mat-elevation-z2 { box-shadow: 0px 2px 2px rgba(0,0,0,0.2); }
            .mat-elevation-z4 { box-shadow: 0px 4px 4px rgba(0,0,0,0.4); }
            h1, h2 { margin-bottom: 10px; }
            ul { list-style: none; padding: 0; }
            ul li { margin-bottom: 5px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
            th { background-color: #f4f4f4; }
          </style>
        </head>
        <body onload="window.print(); window.close()">
          ${printContents}
        </body>
      </html>
    `);
    popupWin?.document.close();
  }
}
