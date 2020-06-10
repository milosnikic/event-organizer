import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = '/api/users';
  loginUrl = '/api/login';
  constructor(private http: HttpClient) {}

  getUser(id: number) {
    return this.http.get(this.baseUrl + '/' + id + '');
  }

  register(user: User) {
    return this.http.post(this.baseUrl, user);
  }

  login(username: string, password: string) {
    const loginUser = {
      username,
      password,
    };
    return this.http.post(this.loginUrl, loginUser);
  }
}
