import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {

  constructor() { }

  pair(object, bind, value?) {
    if (typeof bind === 'string') {
      return this.pair(object, bind.split('.'), value);
    } else if (bind.length === 1 && value !== undefined) {
       return object[bind[0]] = value;
    } else if (bind.length === 0) {
      return object;
    } else {
      return this.pair(object[bind[0]], bind.slice(1), value);
    }
  }
}
