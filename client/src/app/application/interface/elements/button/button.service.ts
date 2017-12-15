import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ButtonService {
  constructor(private http: Http) {}

  execute(action: string, body: any): Observable<any>  {
    let jwt = localStorage.getItem('client');
    let URL = 'http://127.0.0.1:1337/action/' + action;

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': jwt
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(URL, body , options)
                    .map((res: Response) => {
                      if (res.json()) {
                        return res.json();
                      }
                    })
                    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
