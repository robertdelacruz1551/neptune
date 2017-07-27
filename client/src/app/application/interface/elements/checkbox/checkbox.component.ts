import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  @Input() config: CheckboxConfig;
  @Input() bind: any [] = [];
  @Output() update = new EventEmitter();
  private id: string;
  private _bind: any [] = [];

  updateArray(value, checked) {
    if ( checked ) {
      this._bind.push( value );
    } else if ( !checked ) {
      let i = this._bind.indexOf(value);
      this._bind.splice(i, 1);
    }
  }

  isChecked(value): boolean {
    if (!this._bind || this._bind.indexOf(value) === -1) {
      return false;
    } else { return true; };
  }

  ngOnInit() {
    if (this.bind) {
      this._bind = this.bind;
    };
    this.id = Math.random().toString(36).substring(7);
  };
}
export class CheckboxConfig {
  label: { text: string; };
  input: { readonly?: boolean; options: { name?: string; value?: any; text: string }[]; };
}
