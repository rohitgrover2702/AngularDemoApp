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
  constructor(private fb: FormBuilder, private demoservice: DemoService,
    private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
    });
  }
  onSubmit() {
    debugger;
    this.customer = this.loginForm.value;
    this.demoservice.login(this.customer).subscribe(res => {
      console.log(res);
      res[0].roleId = '1';
      localStorage.setItem('userDetail', JSON.stringify(res));
      this.loginForm.reset({
        firstname: '',
        lastname: '',
        email: '',
      });
      if (res) {
        this.router.navigate(['/customer']);
      }
    }, errmess => console.log(errmess));

  }
}
