import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {

  constructor() { }
  private formSkills: any[] = [];
  private formEducation: any[] = [];
  private formTraining: any[] = [];
  private formSeminar: any[] = [];
  private formEmployment: any[] = [];
  private formCertificate: any[] = [];

  setformSkills(data: any[]) {
    this.formSkills = data;
  }

  setformEducation(data: any[]) {
    this.formEducation = data;
  }
  setformTraining(data: any[]) {
    this.formTraining = data;
  }

  setformSeminar(data: any[]) {
    this.formSeminar = data;
  }
  setformEmployment(data: any[]) {
    this.formEmployment = data;
  }
  setformCertificate(data: any[]) {
    this.formCertificate = data;
  }

  getSkills() {
    return this.formSkills;
  }

  getDataEducation() {
    return this.formEducation;
  }

  getDataTraining() {
    return this.formTraining;
  }
  getDataSeminar() {
    return this.formSeminar;
  }
  getDataEmployment() {
    return this.formEmployment;
  }
  getDataCertificate() {
    return this.formCertificate;
  }




}
