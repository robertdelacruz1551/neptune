import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {
  @Input() panels: any[] = [];
  @Input() data: any;
  constructor() { }
  ngOnInit() {
    //console.log(this.panels);
  }
}
