import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
baseUrl = 'http://localhost:3000/users';

constructor(private http: HttpClient) { }

getUser(id: number){
  return this.http.get(this.baseUrl + '/' + id+'');
}

register(){}

}
