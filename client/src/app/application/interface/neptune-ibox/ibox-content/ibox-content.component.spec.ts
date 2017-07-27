/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IboxContentComponent } from './ibox-content.component';

describe('IboxContentComponent', () => {
  let component: IboxContentComponent;
  let fixture: ComponentFixture<IboxContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IboxContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IboxContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
