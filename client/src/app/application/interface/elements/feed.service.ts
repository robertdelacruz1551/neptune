import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FeedService {
  constructor(private http: Http) {}

  datafeed(feed: string): Observable<any>  {
    let jwt = localStorage.getItem('client');
    let url = 'http://127.0.0.1:1337/feed/' + feed;
    let body = { _id: feed };
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': jwt
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(url, options)
                    .map((res: Response) => res.json())
                    .catch((error: any) => Observable.throw(error));
  }
}
