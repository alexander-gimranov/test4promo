import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgIf } from '@angular/common';
import { Country, Province, User } from './models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, HttpClientModule, CommonModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  step = 1;
  public step1Form!: FormGroup;
  public step2Form!: FormGroup;
  countries: Country[] = [];
  provinces: Province[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;
  newUser: User = {
    email: '',
    password: '',
    provinceId: 0,
    countryId: 0
  };

  constructor(private apiService: ApiService) {
    this.step1Form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-zA-Z]).{2,}$/)]),
      confirmPassword: new FormControl('', Validators.required),
      agree: new FormControl(false, Validators.requiredTrue),
    });

    this.step2Form = new FormGroup({
      country: new FormControl('', Validators.required),
      province: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.apiService.getCountries().subscribe((data) => {
      this.countries = data;
    });
  }

  nextStep() {
    if (this.step1Form.valid && this.step1Form.value.password === this.step1Form.value.confirmPassword) {
      this.step = 2;
    } else {
      this.step1Form.markAllAsTouched();
    }
  }

  onCountryChange(event: any) {
    const countryId = event.target.value;
    this.apiService.getProvinces(countryId).subscribe((data) => {
      this.provinces = data;
    });
  }

  save() {
    if (this.step2Form.valid) {
      // Save data to the database using the endpoint defined in AppConfig
      this.newUser.email = this.step1Form.get('email')?.value;
      this.newUser.password = this.step1Form.get('password')?.value;
      this.newUser.countryId = this.step2Form.get('country')?.value;
      this.newUser.provinceId = this.step2Form.get('province')?.value;
      this.step = 3;
      this.apiService.saveUser(this.newUser).subscribe({
        next: (response) => {
          this.successMessage = 'User registered successfully!';
          this.errorMessage = null;
          this.step1Form.reset(); // Reset the form on success
          this.step2Form.reset(); // Reset the form on success
        },
        error: (error) => {
          this.successMessage = null;
          this.errorMessage = error.message; // Display error message
        },
      });
    } else {
      this.step2Form.markAllAsTouched();
    }
  }

  reset() {
    this.step = 1;
  }
}
