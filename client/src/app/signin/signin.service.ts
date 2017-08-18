import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SigninService {
  constructor(private http: HttpClient) {}
  authenticate(user: {username: string; password: string;}) {
    let url = 'http://127.0.0.1:1337/authenticate';
    return this.http.post(url, user, { responseType: 'json' }).subscribe();
  };
}
