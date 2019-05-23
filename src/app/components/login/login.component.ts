import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DemoService } from 'src/app/services/demo.service';
import { Customer } from 'src/app/models/Customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  customer: Customer = {};
  loginForm: FormGroup;
  formErrors = {
    'email': '',
    'password': ''
  };
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format.'
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password should be minimum of 6 characters.'
    },
  };
  constructor(private fb: FormBuilder, private demoservice: DemoService,
    private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
    });
    this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }
  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  onSubmit() {
    this.customer = this.loginForm.value;
    this.demoservice.login(this.customer).subscribe(res => {
      localStorage.setItem('userDetail', JSON.stringify(res));
      this.loginForm.reset({
        email: '',
        password: ''
      });
      if (res) {
        this.router.navigate(['/customer']);
      }
    }, errmess => console.log(errmess));
  }
}
