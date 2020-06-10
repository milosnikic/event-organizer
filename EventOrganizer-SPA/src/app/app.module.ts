import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
   ],
   imports: [
      HttpClientModule,
      ReactiveFormsModule,
      BrowserModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot(
         {
            timeOut: 5000,
            preventDuplicates: true,
            positionClass: 'toast-top-left'}
      )
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
