import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-cv',
  templateUrl: './print-cv.component.html',
  styleUrls: ['./print-cv.component.css']
})
export class PrintCVComponent implements OnInit {
  cvData = {
    header: {
      firstname: "TESTING",
      familyname: "JOSE",
      profession: "CONSTRUCTION MANAGER",
      datebirth: "09 NOV 1976",
      contact: "+639198555057",
      current: "ILO-ILO, PHILIPPINES",
    },
    profile: "A dedicated software developer with over 5 years of experience in creating robust and scalable web applications.",
    workExperience: [
      {
        title: "Senior Developer at TechCorp",
        duration: "Jan 2020 - Present",
        details: [
          "Developed and maintained enterprise-level applications using Angular and .NET Core.",
          "Improved application performance by 25% through optimized code and database queries.",
        ],
      },
      {
        title: "Software Engineer at DevSolutions",
        duration: "Aug 2017 - Dec 2019",
        details: [
          "Built responsive web applications using HTML, CSS, and JavaScript frameworks.",
          "Collaborated with cross-functional teams to design and implement innovative solutions.",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Computer Science",
        institution: "University of Technology",
        duration: "2013 - 2017",
      },
    ],
    skills: ["Angular", "React", "Vue.js", ".NET Core", "C#", "SQL", "NoSQL Databases", "Version Control (Git)"],
  };

  constructor() { }

  ngOnInit(): void {
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
