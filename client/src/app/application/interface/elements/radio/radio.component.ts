import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {
  @Input() config: RadioConfig;
  @Input() bind: string;
  @Output() update = new EventEmitter();
  private id: string;

  ngOnInit() {
    this.id = Math.random().toString(36).substring(7);
  };
}
export class RadioConfig {
  label: { text: string; };
  input: { readonly?: boolean; name: string; options: { value: any; text: string; } []};
};
