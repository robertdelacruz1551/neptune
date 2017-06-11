import { Component, OnInit } from '@angular/core';
import { InterfaceService, Interfaces } from './interface.service';

const InterfaceDefault: Interfaces = {
  name: null,
  description: null,
  url: null,
  panels: [],
  data: {}
};

@Component({
  selector: 'interface',
  template: `
  <div class="row">
    <div class="col-sm-10">
      <div class="ibox float-e-margins">
        <div class="ibox-title">
          <h5 [innerHtml]="interface.name"></h5>
          <div class="ibox-tools">
            <a class="collapse-link">
              <i class="fa fa-chevron-up"></i>
            </a>
            <a class="dropdown-toggle" data-toggle="dropdown" href="#">
              <i class="fa fa-wrench"></i>
            </a>
            <ul class="dropdown-menu dropdown-user">
              <li><a href="#">Config option 1</a></li>
              <li><a href="#">Config option 2</a></li>
            </ul>
            <a class="close-link">
              <i class="fa fa-times"></i>
            </a>
          </div>
        </div>
        <div class="ibox-content">
          <ul *ngIf="interface.panels.length > 1" class="nav nav-tabs nav-justified" role="tablist">
            <li *ngFor="let panel of interface.panels; let i = index;" [ngClass]="(i === 0)?'nav-link active':'nav-link'">
              <a [href]="'#' + panel.id" role="tab" [innerHtml]="panel.name" data-toggle="tab"></a>
            </li>
          </ul>
          <div class="tab-content">
            <div *ngFor="let panel of interface.panels; let i = index;" [ngClass]="(i === 0)?'tab-pane active':'tab-pane'" [id]="panel.id" role="tabpanel">
              <div class="row">
                <div class="form-horizontal">

                  <div *ngIf="panel.header" [ngClass]="{'left':'text-left col-sm-12', 'center':'text-center col-sm-12', 'right':'text-right col-sm-12'}[panel.header.align]">
                    <h2 [innerHtml]="panel.header.text"></h2>
                    <p [innerHtml]="panel.header.subtext"></p>
                  </div>
                  
                  <div *ngFor="let container of panel.containers" class="col-sm-12 pane-container">
                    <div *ngFor="let element of container.elements">
                      
                      <textbox *ngIf="element.type==='textbox'"
                        [config]="element[element.type].config"
                        [bind]="interface.data[element[element.type].bind]"
                        (update)="interface.data[element[element.type].bind] = $event"
                      ></textbox>

                      <checkbox *ngIf="element.type === 'checkbox'" 
                        [config]="element[element.type].config" 
                        [bind]="interface.data[element[element.type].bind]"
                      ></checkbox>

                      <radio *ngIf="element.type === 'radio'"    
                        [config]="element[element.type].config" 
                        [bind]="interface.data[element[element.type].bind]" 
                        (update)="interface.data[element[element.type].bind] = $event"
                      ></radio>

                      <dropdown *ngIf="element.type === 'dropdown'" 
                        [config]="element[element.type].config" 
                        [bind]="interface.data[element[element.type].bind]" 
                        (update)="interface.data[element[element.type].bind] = $event"
                      ></dropdown>

                      <datatable *ngIf="element.type === 'datatable'"
                        [config]="element[element.type].config"
                        [dataset]="interface.data[element[element.type].bind]"
                      ></datatable>

                    </div> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        <div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .tab-content {
      padding-top: 25px;
      padding-bottom: 50px;
    }
    .pane-container {
      padding-top: 25px;
    }
  `]
})

export class InterfaceComponent implements OnInit {
  private interface;
  private data = {};
  constructor(
    private service: InterfaceService
  ) { }

  ngOnInit() {
    this.interface = this.service.interface || InterfaceDefault;
  }
}




// tslint:disable-next-line:max-line-length
