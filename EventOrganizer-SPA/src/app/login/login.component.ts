import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { NotifyService } from '../_services/notify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: any = {};
  loginForm: FormGroup;
  registerForm: FormGroup;
  login = true;
  submitted = false;

  constructor(
    private router: Router,
    private notify: NotifyService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
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

      this.userService.register(this.user).subscribe(
        (res) => {
          this.notify.showSuccess('Successfully registered!');
          this.toggle();
        },
        (err) => {
          this.notify.showError('User with specified username or email already exists!');
        }
      );
    }
  }
  loginUser() {
    if(this.loginForm.valid){
      this.userService.login(this.fL.username.value,this.fL.password.value).subscribe(
        (res: any)=>{
          this.notify.showSuccess('Successfully logged in!');
          this.userService.setUser(res.id);
          this.router.navigateByUrl('/calendar', {queryParams : {id:res.id+''}});
        },
        (err)=>{
          this.notify.showError('Check your credentials!');
        }
      )
    }
  }
}
