import { Component, Input, OnInit } from '@angular/core';
import { InterfaceService, Interfaces, Workflow } from './interface.service';

const InterfaceDefault: Interfaces = {
  id: null,
  name: null,
  description: null,
  toolstrip: { enable: false },
  panels: [],
  data: {
    workitem: null,
    subject: {}
  }
};

@Component({
  selector: 'interface',
  template: `
  <div class="row">
    <div class="col-sm-10" style="padding-left: 0px;">
      <div class="ibox float-e-margins">
        <div class="ibox-title">
          <h5 [innerHtml]="interface.name"></h5>
          <div class="ibox-tools">
            <a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
          </div>
        </div>
        <toolstrip *ngIf="interface.toolstrip && interface.toolstrip.enable"
          [config]="interface.toolstrip"
          [data]="interface.data"
        ></toolstrip>
        <div class="ibox-content">
          <ul *ngIf="interface.panels.length > 1" class="nav nav-pills nav-justified" role="tablist">
            <li *ngFor="let panel of interface.panels; let i = index;" [ngClass]="(i === 0)?'nav-link active':'nav-link'">
              <a [href]="'#' + panel.id" role="tab" [innerHtml]="panel.name" data-toggle="tab"></a>
            </li>
          </ul>
          <!-- FORM START -->
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
                      [data]="interface.data.subject"
                    ></interface-elements>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <!-- FORM END -->
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

export class InterfaceComponent implements OnInit {
  private interface;
  constructor(
    private service: InterfaceService
  ) { }

  ngOnInit() {
    this.interface = this.service.interface || InterfaceDefault;
  }

  private save() {
    console.log(this.interface.data);
  }
}



@Component({
  selector: 'workflow',
  template: `
  <ul class="nav navbar-nav navbar-right margin-right-fix">
    <li class="dropdown">
      <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
        {{status}} <span class="caret"></span>
      </a>
      <ul class="dropdown-menu">
        <li *ngFor="let next of nextStatuses">
          <a [innerHtml]="next.name"></a>
        </li>
      </ul>
    </li>
  </ul>
  `,
  styles: [`
  .nav > li > a:hover {
    background-color: #e7eaec;;
    color: #2f4050;
  }
  .nav > li > a {
    padding: 15px 25px 14px 25px;
  }
  .margin-right-fix {
    margin-right: 0px;
  }
  `]
})

export class WorkflowComponent implements OnInit {
  @Input() config: Workflow;
  @Input() status: string; // the current status

  private nextStatuses: { id: string; name: string } [] = [];

  constructor() { }

  nextStatusLookup(currentStatus: string){
    this.config.statuses.forEach(status => {
      if(currentStatus === status.name) this.nextStatuses = status.next;
    });
  }

  ngOnInit() {
    this.nextStatusLookup(this.status);
  };
}



@Component({
  selector: 'toolstrip',
  template: `
  <div class="navbar navbar-default ibox-toolstrip">
    <div class="ibox-container-fluid">
      <ul class="nav navbar-nav">
        <li *ngIf="config.save.enable"><a (click)="save()"><span class="glyphicon glyphicon-floppy-save" aria-hidden="true"></span></a></li>
        <li *ngIf="config.attachment.enable"><a data-toggle="modal" data-target="#modal-attachments"><span class="glyphicon glyphicon-paperclip" aria-hidden="true"></span></a></li>
        <li *ngIf="config.comment.enable"><a data-toggle="modal" data-target="#modal-comments"><span class="glyphicon glyphicon-comment" aria-hidden="true"></span></a></li>
        <li *ngIf="config.share.enable"><a data-toggle="modal" data-target="#modal-share"><span class="glyphicon glyphicon-share" aria-hidden="true"></span></a></li>
        <li *ngIf="config.reminder.enable"><a data-toggle="modal" data-target="#modal-add-notification"><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span></a></li>
        <li *ngIf="config.favorite.enable"><a><span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span></a></li>
      </ul>
      <workflow *ngIf="config.workflow.enable"
        [config]="config.workflow"
        [status]="data.workitem.status"
      ></workflow>
    </div>
  </div>

  <modal *ngIf="config.comment.enable"
    [config]= "config.comment.modal"
    [id]="'modal-comments'"
    [feed]="data.workitem.comments"
  ></modal>

  <modal *ngIf="config.attachment.enable"
    [id]="'modal-attachments'"
    [config]= "config.attachment.modal"
    [feed]="data.workitem.attachments"
  ></modal>
  `,
  styles: [`
  .ibox-toolstrip {
    background-color: #ffffff;
    border-color: #e7eaec;
    border-image: none;
    border-style: solid solid none;
    border-width: 1px 0px;
    color: inherit;
    margin-bottom: 0;
    min-height: 50px;
  }
  .ibox-toolstrip > .ibox-container-fluid > .nav > li > a {
    font-size: 16px;
  }
  .ibox-container-fluid {
    margin-right: auto;
    margin-left: auto;
  }
  .navbar-default .nav > li > a:hover, .navbar-default .nav > li > a:focus {
    background-color: #e7eaec;;
    color: #2f4050;
  }
  .nav > li > a {
    padding: 15px 25px 14px 25px;
  }
  `]
})

export class ToolstripComponent {
  @Input() user;
  @Input() config;
  @Input() data;

  save() {
    console.log(this.data);
  }
  constructor() { }
  ngOnInit() {
    //console.log(this.data.comments);
  }
}

/**
  <social-modal
    [comments] = "interface.data.workitem.comments"
    [user] = "{name:'Robert De La Cruz', img: '#'}"
  ></social-modal>
 */

// tslint:disable-next-line:max-line-length
