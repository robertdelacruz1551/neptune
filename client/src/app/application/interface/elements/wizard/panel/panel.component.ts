import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  @Input() id: string;
  @Input() panel: any [] = [];

  public header: string = null;
  public description: string = null;

  constructor() { }
  ngOnInit() {
  }
}
