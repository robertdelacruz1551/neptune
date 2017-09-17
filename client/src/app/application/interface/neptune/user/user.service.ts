import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  getUser(jwt: string, user: string):Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': jwt }); 
    let options = new RequestOptions({ headers: headers }); 
    let url = 'http://127.0.0.1:1337/api/secure/interface/user/' + user ;
    return this.http.get(url, options) 
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
