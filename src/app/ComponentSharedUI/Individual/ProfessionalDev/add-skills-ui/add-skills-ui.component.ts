import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ProfessionalService } from 'src/app/services/SharedServices/professional.service';

@Component({
  selector: 'app-add-skills-ui',
  templateUrl: './add-skills-ui.component.html',
  styleUrls: ['./add-skills-ui.component.css']
})
export class AddSkillsUIComponent {

  constructor(private dataService: ProfessionalService) { }

  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillsCtrl = new FormControl('');
  skills: string[] = [];  // Array to store selected skills
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

   @Output() saveData = new EventEmitter<string[]>(); // Output event for Save button

  filteredSkills = this.skillsCtrl.valueChanges.pipe(
    startWith(null),
    map((skill: string | null) =>
      skill ? this._filter(skill) : this.allSkills.slice()
    )
  );

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add the skill if it's not already in the list
    if (value && !this.skills.includes(value)) {
      this.skills.push(value);
      this.passData();  // Call passData after adding a skill
    }

    // Clear the input field after adding
    event.chipInput!.clear();
    this.skillsCtrl.setValue(null);
  }

  remove(skill: string): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
      this.passData();  // Call passData after removing a skill
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    if (!this.skills.includes(value)) {
      this.skills.push(value);
     // this.passData();  // Call passData after selecting a skill
    }
    this.skillsCtrl.setValue(null);
  }

  // Pass selected skills data to the service or parent component
  passData(): void {
    this.dataService.setformSkills(this.skills);  // Pass the selected skills to the service
   // console.log('Selected skills passed to service:', this.skills);  // Log for verification
    this.saveData.emit(this.skills);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allSkills.filter(skill => skill.toLowerCase().includes(filterValue));
  }
}
