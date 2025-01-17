import { Component, OnInit } from '@angular/core';
import { CurriculumVitaeService } from 'src/app/services/CV/curriculum-vitae.service';
@Component({
  selector: 'app-print-cv',
  templateUrl: './print-cv.component.html',
  styleUrls: ['./print-cv.component.css']
})
export class PrintCVComponent implements OnInit {
  cvData: any = null; // Initialize as null to indicate loading
  error: string | null = null;
  
  constructor(private cvService:CurriculumVitaeService ) { }


  ngOnInit(): void {
    this.getCVData();
  }


  getCVData(): void {
    this.cvService.getDataCV().subscribe(
      (response) => {
        if (response.message) {
          this.cvData = response.message; // Assign the response data to `cvData`
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching CV data:', error);
      }
    );
  }


  printData() {
    //const printContent = document.getElementById('print-content');
    const originalContent = document.body.innerHTML;
    if (originalContent) {
      document.body.innerHTML = originalContent;
      window.print();
     document.body.innerHTML = originalContent;
      window.location.reload(); // Reload to restore original content
    }
  }

  // printDataxx() {
  //   const printContent = document.getElementById('print-content')?.innerHTML;
    
  //   // Calculate the center position of the window
  //   const windowWidth = 600; // Set desired window width
  //   const windowHeight = 800; // Set desired window height
  //   const left = (window.innerWidth / 2) - (windowWidth / 2);  // Center horizontally
  //   const top = (window.innerHeight / 2) - (windowHeight / 2);  // Center vertically
  
  //   // Open a new window with calculated positions
  //   const newWindow = window.open('', '_blank', `width=${windowWidth},height=${windowHeight},left=${left},top=${top}`);
    
  //   // Write content to the new window
  //   newWindow?.document.write(`<html><head><title>Print CV</title></head><body>${printContent}</body></html>`);
  //   newWindow?.document.close();
    
  //   // Print the content and close the window
  //   newWindow?.print();
  //   newWindow?.close();
  // }
  

  // printLayout() {
  //   const printContents = document.getElementById('printSection');
  //   const popupWin = window.open('', '_blank', 'width=800,height=600');
  //   popupWin?.document.open();
  //   popupWin?.document.write(`
  //     <html>
  //       <head>
  //         <title>Print Resume</title>
        
  //       </head>
  //       <body onload="window.print(); window.close()">
  //         ${printContents}
  //       </body>
  //     </html>
  //   `);
  //   popupWin?.document.close();
  // }


  // printPages() {
  //   // Capture the content you want to print
  //   const content = document.getElementById('print-content');

  //   if (content) {
  //     // First, generate the PDF using jsPDF
  //     html2canvas(content).then((canvas) => {
  //       const doc = new jsPDF();

  //       // Convert the canvas to an image and add it to the PDF
  //       const imgData = canvas.toDataURL('image/png');

  //       // Adjust the image size (You can tweak these numbers to adjust size)
  //       const imgWidth = 210; // A4 width in mm
  //       const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //       // Add image to the PDF, starting at position (10, 10)
  //       doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);

  //       // Save the generated PDF with a custom filename
  //       // doc.save('filename.pdf');
  //     });

  //     // Trigger the browser's print dialog
  //     window.print();
  //   } else {
  //     console.error('Content not found!');
  //   }
  // }
}
