import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FeedService {
  constructor(private http: Http) {}

  datafeed(feed: String): Observable<any>  {
    let jwt = localStorage.getItem('client');
    let url = 'http://127.0.0.1:1337/api/secure/feed';
    let body = { _id: feed };
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': jwt }); 
    let options = new RequestOptions({ headers: headers }); 

    return this.http.post(url, body ,options) 
                    .map((res:Response) => {
                      // console.log(res);
                      if(res.json()) {
                        return res.json();
                      }
                    })
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
