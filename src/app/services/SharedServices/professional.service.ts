import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {

  constructor() { }
  private formData: any[] = [];

  setData(data: any[]) {
    this.formData = data;
  }

  getData() {
    return this.formData;
  }
}
