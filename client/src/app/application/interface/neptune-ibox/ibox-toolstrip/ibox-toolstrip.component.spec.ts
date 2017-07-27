/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IboxToolstripComponent } from './ibox-toolstrip.component';

describe('IboxToolstripComponent', () => {
  let component: IboxToolstripComponent;
  let fixture: ComponentFixture<IboxToolstripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IboxToolstripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IboxToolstripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
