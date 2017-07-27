/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NeptuneIboxComponent } from './ibox.component';

describe('NeptuneIboxComponent', () => {
  let component: NeptuneIboxComponent;
  let fixture: ComponentFixture<NeptuneIboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeptuneIboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeptuneIboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
