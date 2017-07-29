import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  @Input() config: DropdownConfig;
  @Input() bind: string;
  @Output() update = new EventEmitter();
  otherSelected: boolean;
  private id: string;
  ngOnInit() {
    this.id = Math.random().toString(36).substring(7);
  };
}
export class DropdownConfig {
  label: { text: string; };
  input: {
    readonly?: boolean;
    size?: string;
    name: string;
    emptyOption?: boolean;
    otherOption?: boolean;
    options: { value: string; text: string; }[] };
};
