import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/services/Global/notifications.service';

@Component({
  selector: 'app-add-edit-skills',
  templateUrl: './add-edit-skills.component.html',
  styleUrls: ['./add-edit-skills.component.css']
})
export class AddEditSkillsComponent implements OnInit {
  allSkills: string[] = [
    "Network Configuration",
    "Network Protocols (TCP/IP, UDP, HTTP, DNS, etc.)",
    "Network Security",
    "Firewall Management",
    "VPN Setup and Management",
    "Wi-Fi and LAN/WAN Configuration",
    "Cloud Networking",
    "Network Troubleshooting and Diagnostics",
    "Routing and Switching",
    "Load Balancing and Failover",
    "DNS Management",
    "Network Performance Optimization",
    "Network Automation",
    "Network Monitoring and Analysis",
    "QoS (Quality of Service) Management",
    "SDN (Software-Defined Networking)",
    "VLAN Configuration",
    "Network Virtualization",
    "IP Address Management (IPAM)",
    "Packet Analysis",
    "IT Specialist",
    "Front End Developer",
    "Back End Developer",
    "Full Stack Developer"
  ];
  filteredSkills: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddEditSkillsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private alert:NotificationsService
  ) {}

  ngOnInit(): void {
    // Initialize the filteredSkills with allSkills
    this.filteredSkills = this.allSkills;
  }

  filterSkills(value: string): void {
    const filterValue = value ? value.toLowerCase() : '';
    this.filteredSkills = this.allSkills.filter((skill) =>
      skill.toLowerCase().includes(filterValue)
    );
  }
  
  onSkillSelected(event: any): void {
    if (event.option && event.option.value) {
      this.data.skills = event.option.value; // Update the selected skill
    }
  }
  

  save(): void {
    this.alert.toastrSuccess("Successfuly Updated.")
    this.dialogRef.close(this.data); // Close the dialog and return the data
  }
}
