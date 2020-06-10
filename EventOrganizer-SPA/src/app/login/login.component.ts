import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { NotifyService } from '../_services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: any = {};
  loginForm: FormGroup;
  registerForm: FormGroup;
  login = false;
  submitted = false;

  constructor(
    private notify: NotifyService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get fL() {
    return this.loginForm.controls;
  }
  get fR() {
    return this.registerForm.controls;
  }

  toggle() {
    this.login = !this.login;
  }

  registerUser() {
    if (this.registerForm.valid) {
      this.user.username = this.fR.username.value;
      this.user.password = this.fR.password.value;
      this.user.email = this.fR.email.value;
      console.log(this.user)
      this.userService.register(this.user).subscribe(
        (res) => {
          this.notify.showSuccess('Successfully registered!');
          console.log(res);
        },
        (err) => {
          this.notify.showError('User with specified username or email already exists!');
          console.log(err);
        }
      );
    }
  }
  loginUser() {
    if(this.loginForm.valid){
      this.userService.login(this.fL.username.value,this.fL.password.value).subscribe(
        (res)=>{
          this.notify.showSuccess('Successfully logged in!');
          console.log(res)
        },
        (err)=>{
          this.notify.showError('Check your credentials!');
          console.log(err)
        }
      )
    }
  }
}
