import { Component, OnInit, Input } from '@angular/core';
import { Panels } from '../../ibox/ibox.service';

@Component({
  selector: 'accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {
  @Input() config: AccordionConfig;
  @Input() dataset: any [];

  constructor() { }
  ngOnInit() {
    if ( this.dataset ) {
      this.dataset.forEach(data => {
        if (!data._id) {
          data._id = Math.random().toString(36).substring(7);
        };
      });
    }
  }
}
export class AccordionConfig {
  title: string;
  subtitle: string;
  panels: Panels [];
};

