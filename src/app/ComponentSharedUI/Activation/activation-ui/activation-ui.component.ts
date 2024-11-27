import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-activation-ui',
  templateUrl: './activation-ui.component.html',
  styleUrls: ['./activation-ui.component.css']
})
export class ActivationUIComponent implements OnInit {

  isLoading: boolean= false;
  activationForm: FormGroup; // Define the form group properly

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.activationForm = this.fb.group({
      code: [''],
    });
  }

  onSubmit() {

    }
}
