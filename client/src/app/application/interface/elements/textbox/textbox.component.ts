import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css']
})
export class TextboxComponent implements OnInit {
  @Input() config: TextBoxConfig;
  @Input() bind: string;
  @Input() readonly: boolean;
  @Output() update = new EventEmitter();
  ngOnInit() {};
}
export class TextBoxConfig {
  label: { text?: string; };
  input: { name: string; placeholder?: string; size?: string; };
  rules?: { showIf?: string; };
};
