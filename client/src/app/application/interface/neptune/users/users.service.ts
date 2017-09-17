import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Interfaces } from '../../../../application/interface/interface.service';


@Injectable()
export class UsersService {
  constructor( private http: Http) { }

  getUsers(jwt):Observable<Interfaces> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': jwt }); 
    let options = new RequestOptions({ headers: headers }); 
    let url = 'http://127.0.0.1:1337/api/secure/interface/users';
    return this.http.get(url, options) 
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
