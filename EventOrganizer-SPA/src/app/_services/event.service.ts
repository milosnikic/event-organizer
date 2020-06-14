import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { map, first } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  baseUrl = '/api/events';

  constructor(private http: HttpClient,
              private datePipe: DatePipe,
              private userService: UserService
    ) { }

  addEvent(event: any){
    const data = {
      name: event.title,
      start: this.datePipe.transform(event.start, 'yyyy-MM-dd'),
      end: this.datePipe.transform(event.end, 'yyyy-MM-dd'),
      primary: event.color.primary,
      secondary: event.color.secondary,
      user_id: this.userService.loggedUser
    };
    return this.http.post(this.baseUrl, data);
  }

  updateEvent(event: any) {
    const data = {
      name: event.title,
      start: this.datePipe.transform(event.start, 'yyyy-MM-dd'),
      end: this.datePipe.transform(event.end, 'yyyy-MM-dd'),
      primary: event.color.primary,
      secondary: event.color.secondary,
      user_id: this.userService.loggedUser
    };
    return this.http.put(this.baseUrl + '/' + this.userService.loggedUser, data);
  }

  deleteEvent(eventId: number){
    return this.http.delete(this.baseUrl + '/' + eventId);
  }

  getAllEventsForUser(userId: number){
    return this.http.get<any>(this.baseUrl + '/user/' + userId + '')
      .pipe(
        first(),
        map((events: any[])=>{
          return events.map((event: any) => ({
            ...event,
            color :{
              primary: event.primary,
              secondary: event.secondary
            },
            title: event.name,
            start: new Date(event.start),
            end: new Date(event.end),
          }))
        })
      );
  }
}
