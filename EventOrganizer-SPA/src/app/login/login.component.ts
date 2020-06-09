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
  user: User;
  loginForm: FormGroup;
  registerForm: FormGroup;
  login = true;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private notify: NotifyService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      email: ['',[Validators.required, Validators.email]]
    });
  }

   get fL(){ return this.loginForm.controls;}
   get fR(){ return this.registerForm.controls;}

  toggle() {
    console.log(this.login);
    this.login = !this.login;
  }


  registerUser(){
    if(this.registerForm.valid){
      this.user.username = this.fR.username.value;
      this.user.password = this.fR.password.value;
      this.user.email = this.fR.email.value;
      this.userService.register(this.user).subscribe(
        (res)=>{
          this.notify.showSuccess('Successfully registered!');
        },
        (err) => {
          this.notify.showError(err);
        }
      )
    }
  }
  loginUser(){}
}
