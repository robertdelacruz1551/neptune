import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Interfaces } from '../interface.service';

@Component({
  selector: 'interface-designer',
  template: `
  <div class="row">

    <div class="pull-right col-sm-3" style="padding-left: 0px;">
      <div class="ibox float-e-margins">
        <div class="ibox-content">
          <div class="form-group">
            <input type="text" class="form-control imput-sm" placeholder="Application Name" [(ngModel)]="interface.name" >
          </div>
          <div class="form-group">
            <textarea class="form-control input-sm" placeholder="Description" rows="5" [(ngModel)]="interface.description"></textarea>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-9" style="padding-left: 0px;">
      <div class="ibox float-e-margins">
        <div class="ibox-title">
          <h5 [innerHtml]="interface.name"></h5>
          <div class="ibox-tools">
            <a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
          </div>
        </div>
        <!-- toolstrip -->
        <div class="navbar navbar-default ibox-toolstrip">
          <div class="ibox-container-fluid">
            <ul class="nav navbar-nav">

              <li><a><span class="glyphicon glyphicon-plus"></span></a></li>
            </ul>
            

          </div>
        </div>
        <!-- -->
        <!-- ibox-content
        <div class="ibox-content">
          <ul *ngIf="interface.panels.length > 1" class="nav nav-pills nav-justified" role="tablist">
            <li *ngFor="let panel of interface.panels; let i = index;" [ngClass]="(i === 0)?'nav-link active':'nav-link'">
              <a [href]="'#' + panel.id" role="tab" [innerHtml]="panel.name" data-toggle="tab"></a>
            </li>
          </ul>
          <form class="form-horizontal"> 
            <div class="tab-content">
              <div *ngFor="let panel of interface.panels; let i = index;" [ngClass]="(i === 0)?'tab-pane active':'tab-pane'" [id]="panel.id" role="tabpanel">
                <div class="row">
                  <div *ngIf="panel.header" [ngClass]="{'left':'text-left col-sm-12', 'center':'text-center col-sm-12', 'right':'text-right col-sm-12'}[panel.header.align]">
                    <h2 [innerHtml]="panel.header.text"></h2>
                    <p [innerHtml]="panel.header.subtext"></p>
                  </div>
                  <div *ngFor="let container of panel.containers; let containerCount = index;" class="col-sm-12 pane-container">
                    <div *ngIf="containerCount !== 0" class="hr-line-dashed"></div>
                    <interface-elements
                      [elements]="container.elements"
                      [data]="interface.data"
                    ></interface-elements>
                  </div>
                </div>
              </div>
            </div>
          </form>
        <div>
        -->
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
    .nav-pills>li>a {
      font-size: 11px; 
    }
    .nav-pills > li.active {
      border-left: 0px;
      background: white;
    }
    .nav-link {
      padding: 0px 5px 0px 5px;
    }
    .navbar {
      border-radius: 0px;
    }
    .nav > li > a {
      padding: 15px 25px 14px 25px;
    }
  `]
})

export class InterfaceDesignerComponent implements OnInit {
  private interface: Interfaces = {
    id: null,
    name: null,
    description: null,
    sidebar: { enable: false, label: null },
    toolstrip: { enable: false },
    panels: [],
    data: {
      workitem: null,
      subject: {}
    }
  };

  constructor() { }
  ngOnInit() { }
}





// tslint:disable-next-line:max-line-length
