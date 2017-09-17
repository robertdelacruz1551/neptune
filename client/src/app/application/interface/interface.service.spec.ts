/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InterfaceService } from './interface.service';

describe('Service: InterfaceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterfaceService]
    });
  });

  it('should ...', inject([InterfaceService], (service: InterfaceService) => {
    expect(service).toBeTruthy();
  }));
});
