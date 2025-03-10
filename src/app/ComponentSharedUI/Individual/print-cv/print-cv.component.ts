// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { Router } from '@angular/router';
// import { CurriculumVitaeService } from 'src/app/services/CV/curriculum-vitae.service';
// import { ToolBoxService } from 'src/app/services/Global/tool-box.service';
// @Component({
//   selector: 'app-print-cv',
//   templateUrl: './print-cv.component.html',
//   styleUrls: ['./print-cv.component.css']
// })
// export class PrintCVComponent implements OnInit {
//   cvData: any = null; // Initialize as null to indicate loading
//   error: string | null = null;
//   @ViewChild('printContent') printContent!: ElementRef;
  
//   headers:any[];
//   Title:any;
//   Transaction:any;
//   printArray:any=[];

//   constructor(private cvService:CurriculumVitaeService,private toolBoxService: ToolBoxService,
//     private router:Router,
  
  
//   ) { }


//   ngOnInit(): void {
//     this.getCVData();
  
//     this.printArray = JSON.parse(localStorage.getItem('Headers') || '[]'); // Default to an empty array
//     this.Title = localStorage.getItem('Title') || ''; // Default to an empty string
//     this.Transaction = localStorage.getItem('Transaction') || ''; // Default to an empty string
//   }
  


//   getCVData(): void {
//     this.cvService.getDataCV().subscribe(
//       (response) => {
//         if (response.message) {
//           this.cvData = response.message;
//           this.printArray = response.message;
//            // Assign the response data to `cvData`
//         } else {
//           console.error('Invalid response format:', response);
//         }
//       },
//       (error) => {
//         console.error('Error fetching CV data:', error);
//       }
//     );
//   }

//   printDataxxx(): void {
//     const printContent = document.getElementById('print-content')?.innerHTML;

//     const newWindow = window.open('', '_blank', 'width=800,height=600');
//     if (newWindow) {
//       newWindow.document.open();
//       newWindow.document.write(`
//         <html>
//           <head>
//             <title>Print CV</title>
//             <style>
//               /* Add your print styles here */
//               body {
//                 font-family: Arial, sans-serif;
//                 margin: 20px;
//               }
//               .cv-header, .cv-section {
//                 margin-bottom: 20px;
//               }
//             </style>
//           </head>
//           <body onload="window.print(); window.close();">
//             ${printContent}
//           </body>
//         </html>
//       `);
//       newWindow.document.close();
//     } else {
//       alert('Unable to open print window. Please check your browser settings.');
//     }
//   }
//   printData() {
//     //const printContent = document.getElementById('print-content');
//     const originalContent = document.body.innerHTML;
//     if (originalContent) {
//       document.body.innerHTML = originalContent;
//       window.print();
//      document.body.innerHTML = originalContent;
//       window.location.reload(); // Reload to restore original content
//     }
//   }

//   onClickPrintReceipts(){
//     var url = this.router.serializeUrl(
//       this.router.createUrlTree(['print/printcv'])
//     );
//     this.popupWindow(url, 'Items', window, 800, 800);
//     localStorage.setItem('Headers', JSON.stringify(this.printArray));
//   //  localStorage.setItem('Title', 'ITEMS RECEIPT from '+this.toolBoxService.ConvertToDateFormat(new Date(this.TransDateFrom)) +' to '+  this.toolBoxService.ConvertToDateFormat(new Date(this.TransDateTo)) );
//     localStorage.setItem('Transaction', 'items');
//   }

//    popupWindow(url: string, windowName: string, win: Window = window, w: number, h: number): Window | null {
//     const screenX = win.screenX || win.screenLeft || 0;
//     const screenY = win.screenY || win.screenTop || 0;
//     const outerWidth = win.outerWidth || win.innerWidth || screen.availWidth;
//     const outerHeight = win.outerHeight || win.innerHeight || screen.availHeight;
//     const y = screenY + (outerHeight - h) / 2;
//     const x = screenX + (outerWidth - w) / 2;
  
//     return win.open(
//       url, 
//       windowName, 
//       `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`
//     );
//   }
  
  
//   printDatacc() {
//     const printContent = document.getElementById('print-content')?.innerHTML;
    
//     // Calculate the center position of the window
//     const windowWidth = 600; // Set desired window width
//     const windowHeight = 800; // Set desired window height
//     const left = (window.innerWidth / 2) - (windowWidth / 2);  // Center horizontally
//     const top = (window.innerHeight / 2) - (windowHeight / 2);  // Center vertically
  
//     // Open a new window with calculated positions
//     const newWindow = window.open('', '_blank', `width=${windowWidth},height=${windowHeight},left=${left},top=${top}`);
    
//     // Write content to the new window
//     newWindow?.document.write(`<html><head><title>Print CV</title></head><body>${printContent}</body></html>`);
//     newWindow?.document.close();
    
//     // Print the content and close the window
//     newWindow?.print();
//     newWindow?.close();
//   }
  

//   printDatavv() {
//     const printContents = document.getElementById('printSection');
//     const popupWin = window.open('', '_blank', 'width=800,height=600');
//     popupWin?.document.open();
//     popupWin?.document.write(`
//       <html>
//         <head>
//           <title>Print Resume</title>
        
//         </head>
//         <body onload="window.print(); window.close()">
//           ${printContents}
//         </body>
//       </html>
//     `);
//     popupWin?.document.close();
//   }


//   // printPages() {
//   //   // Capture the content you want to print
//   //   const content = document.getElementById('print-content');

//   //   if (content) {
//   //     // First, generate the PDF using jsPDF
//   //     html2canvas(content).then((canvas) => {
//   //       const doc = new jsPDF();

//   //       // Convert the canvas to an image and add it to the PDF
//   //       const imgData = canvas.toDataURL('image/png');

//   //       // Adjust the image size (You can tweak these numbers to adjust size)
//   //       const imgWidth = 210; // A4 width in mm
//   //       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//   //       // Add image to the PDF, starting at position (10, 10)
//   //       doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);

//   //       // Save the generated PDF with a custom filename
//   //       // doc.save('filename.pdf');
//   //     });

//   //     // Trigger the browser's print dialog
//   //     window.print();
//   //   } else {
//   //     console.error('Content not found!');
//   //   }
//   // }
// }


import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CurriculumVitaeService } from 'src/app/services/CV/curriculum-vitae.service';
import { ToolBoxService } from 'src/app/services/Global/tool-box.service';

@Component({
  selector: 'app-print-cv',
  templateUrl: './print-cv.component.html',
  styleUrls: ['./print-cv.component.css']
})
export class PrintCVComponent implements OnInit {
  cvData: any = null; 
  error: string | null = null;
  @ViewChild('printContent') printContent!: ElementRef;
  
  headers: any[] = [];
  Title: string = '';
  Transaction: string = '';
  printArray: any[] = [];

  constructor(
    private cvService: CurriculumVitaeService,
    private toolBoxService: ToolBoxService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCVData();

    this.cvData = JSON.parse(localStorage.getItem('Headers') || '[]');
    this.Title = localStorage.getItem('Title') || '';
    this.Transaction = localStorage.getItem('Transaction') || '';
  }

  getCVData(): void {
    this.cvService.getDataCV().subscribe(
      (response) => {
        if (response?.message) {
          this.cvData = response.message;
          this.printArray = response.message;
        } else {
          this.error = 'Invalid response format.';
        }
      },
      (error) => {
        this.error = 'Error fetching CV data.';
        console.error('Error fetching CV data:', error);
      }
    );
  }

  printData(): void {
    window.print();
  }

  onClickPrintReceipts(): void {
    const url = this.router.serializeUrl(this.router.createUrlTree(['print/printcv']));
    this.popupWindow(url, 'Items', window, 800, 800);
    localStorage.setItem('Headers', JSON.stringify(this.printArray));
    localStorage.setItem('Transaction', 'items');
  }

  popupWindow(url: string, windowName: string, win: Window = window, w: number, h: number): Window | null {
    const y = win.screenY + (win.outerHeight - h) / 2;
    const x = win.screenX + (win.outerWidth - w) / 2;
    return win.open(url, windowName, `width=${w}, height=${h}, top=${y}, left=${x}`);
  }
}
