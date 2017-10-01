import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SigninService {
  // Store the auth token
  public jwt: string;

  constructor(private http: Http) {}


  VerifyClientToken(jwt: string): Observable<boolean> {
    let url = 'http://127.0.0.1:1337/secure/token';
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': jwt });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(url, options)
                    .map((res: Response) => {
                      this.jwt = res.json().jwt;
                      localStorage.setItem('client', this.jwt);
                      return res.json().valid;
                    })
                    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  };

  authenticate( username: string, password: string ): Observable<string> {
    let url = 'http://127.0.0.1:1337/login/598d0e04a848bf4e7f8df53d';
    let user = JSON.stringify({ username: username, password: password });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(url, user, options)
                    .map((res: Response) => {
                      if (res.json().jwt) {
                        this.jwt = res.json().jwt; // stores the jwt in this service for future use
                        localStorage.setItem('client', this.jwt); // stores the username and the jwt locally
                        return res.json().jwt;
                      }else if (res.json().message) {
                        return res.json().message;
                      }
                    })
                    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
