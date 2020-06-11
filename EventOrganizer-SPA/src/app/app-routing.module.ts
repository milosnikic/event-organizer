import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './_services/auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'calendar', component: CalendarComponent ,canActivate: [AuthGuardService]},
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
