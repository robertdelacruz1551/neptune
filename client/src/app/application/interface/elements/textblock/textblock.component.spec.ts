/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TextblockComponent } from './textblock.component';

describe('TextblockComponent', () => {
  let component: TextblockComponent;
  let fixture: ComponentFixture<TextblockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextblockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
