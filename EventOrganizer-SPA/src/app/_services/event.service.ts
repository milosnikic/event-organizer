import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  baseUrl = '/api/events';

  constructor(private http: HttpClient) { }

  addEvent(event: any){
    return this.http.post(this.baseUrl, event);
  }

  getAllEventsForUser(userId: number){
    return this.http.get(this.baseUrl + '/user/' + userId + '');
  }
}
