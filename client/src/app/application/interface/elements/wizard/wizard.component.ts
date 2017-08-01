import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {
  @Input() panels: any[] = [];
  @Input() data: any;

  aetActivePanel(panel) {
    this.panels.forEach(p => {
      p.active = false;
    });
    this.panels[panel].active = true;
  };

  setId() {
    this.panels.forEach(panel => {
      if(!panel.id) {
        panel.id = Math.random().toString(36).substring(7);
      }
    });
  }

  constructor() {
  }
  ngOnInit() {
    this.setId();
  }
}
