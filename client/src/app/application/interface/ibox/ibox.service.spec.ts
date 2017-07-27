/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IboxService } from './ibox.service';

describe('Service: Ibox', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IboxService]
    });
  });

  it('should ...', inject([IboxService], (service: IboxService) => {
    expect(service).toBeTruthy();
  }));
});
