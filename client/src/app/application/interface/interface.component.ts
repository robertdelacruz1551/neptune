import { Component, Input, OnInit } from '@angular/core';
import { InterfaceService, Interfaces, Workflow } from './interface.service';

const InterfaceDefault: Interfaces = {
  id: null,
  name: null,
  description: null,
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
        <div class="navbar navbar-default ibox-toolstrip">
          <div class="ibox-container-fluid">
            <ul class="nav navbar-nav">
              <li>
                <a (click)="save()"><span class="glyphicon glyphicon-floppy-save" aria-hidden="true"></span></a>
              </li>
              <li>
                <a data-toggle="modal" data-target="#modal-attachments"><span class="glyphicon glyphicon-paperclip" aria-hidden="true"></span></a>
              </li>
              <li>
                <a data-toggle="modal" data-target="#social-modal"><span class="glyphicon glyphicon-comment" aria-hidden="true"></span></a>
                <social-modal
                  [comments] = "interface.data.workitem.comments"
                  [user] = "{name:'Robert De La Cruz', img: '#'}"
                ></social-modal>
              </li>
              <li>
                <a data-toggle="modal" data-target="#modal-share"><span class="glyphicon glyphicon-share" aria-hidden="true"></span></a>
              </li>
              <li>
                <a data-toggle="modal" data-target="#modal-add-notification"><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span></a>
              </li>
              <li>
                <a><span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span></a>
              </li>
            </ul>
            <workflow 
              [config]="interface.workflow"
              [status]="interface.data.workitem.status"
            ></workflow>
          </div>
        </div>
        <div class="navbar navbar-default ibox-toolstrip collapse" id="comments-sash">
          <div class="pane-container">
            <div class="col-sm-12">
              <a class="btn btn-default btn-sm" data-toggle="modal" data-target="#modal-comment">New</a>
              <modal
                [id]="'modal-comment'"
                [datarow]="{}"
                [config]= "interface.tools.comments.modal"
                (commit)= "interface.data.workitem.comments.push($event)"
              ></modal>
              <div class="well">
              </div>
            </div>
          </div>
        </div>
        <div class="ibox-content">
          <ul *ngIf="interface.panels.length > 1" class="nav nav-pills nav-justified" role="tablist">
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
                  
                  <div *ngFor="let container of panel.containers; let containerCount = index;" class="col-sm-12 pane-container">
                    <div *ngIf="containerCount !== 0" class="hr-line-dashed"></div>
                    <div *ngFor="let element of container.elements">
                      
                      <textbox *ngIf="element.type==='textbox'"
                        [config]="element[element.type].config"
                        [bind]="interface.data.subject[element[element.type].bind]"
                        (update)="interface.data.subject[element[element.type].bind] = $event"
                      ></textbox>

                      <checkbox *ngIf="element.type === 'checkbox'" 
                        [config]="element[element.type].config" 
                        [bind]="interface.data.subject[element[element.type].bind]"
                      ></checkbox>

                      <radio *ngIf="element.type === 'radio'"    
                        [config]="element[element.type].config" 
                        [bind]="interface.data.subject[element[element.type].bind]" 
                        (update)="interface.data.subject[element[element.type].bind] = $event"
                      ></radio>

                      <dropdown *ngIf="element.type === 'dropdown'" 
                        [config]="element[element.type].config" 
                        [bind]="interface.data.subject[element[element.type].bind]" 
                        (update)="interface.data.subject[element[element.type].bind] = $event"
                      ></dropdown>

                      <datatable *ngIf="element.type === 'datatable'"
                        [config]="element[element.type].config"
                        [dataset]="interface.data.subject[element[element.type].bind]"
                      ></datatable>

                      <textblock *ngIf="element.type === 'textblock'"
                        [config]="element[element.type].config"
                        [bind]="element[element[element.type].bind]"
                        (update)="element[element[element.type].bind] = $event"
                      ></textblock>

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
    .navbar-default .nav > li > a:hover, .navbar-default .nav > li > a:focus {
      background-color: #e7eaec;;
      color: #2f4050;
    }
    .nav > li > a {
      padding: 15px 25px 14px 25px;
    }
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
      <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{status}} <span class="caret"></span></a>
      <ul class="dropdown-menu">
        <li *ngFor="let next of nextStatuses">
          <a [innerHtml]="next.name"></a>
        </li>
      </ul>
    </li>
  </ul>
  `,
  styles: [`
    .margin-right-fix {
      margin-right: 0px;
    }
    .nav > li > a:hover {
      background-color: #e7eaec;;
      color: #2f4050;
    }
    .nav > li > a {
      padding: 15px 25px 14px 25px;
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
  selector: 'social-modal',
  template: `
  <div class="modal fade" id="social-modal" tabindex="-1" role="dialog" aria-labelledby="modal.social.feed">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="modal.social.feed" [innerHtml]="'Enter Comment'"></h4>
        </div>
        <div class="modal-body">
          <div class="form-horizontal">
            <textblock
              [config]="{
                label: { },
                input: { name: 'social.textblock', rows: 6}
              }"
              [bind]="text" (update)="text = $event"
            ></textblock>

            <button type="button" class="btn btn-primary" (click)="commitComment(text)">Submit</button>

            <div class="hr-line-dashed"></div>

            <div *ngFor="let comment of comments">
              <div class="social-feed-box">
                <div class="social-avatar">
                  <a class="pull-left text-muted">
                    <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                  </a>
                  <div class="media-body">
                    <a class="text-muted" [innerHtml]="comment.user.name"></a><br>
                    <small class="text-muted" [innerHtml]="comment.time"></small>
                  </div>
                </div>
                <div class="social-body">
                  <p [innerHtml]="comment.text"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .glyphicon-user {
      font-size: 25px;
      margin: 5px;
    }
    .social-body {
      margin-top: 5px;
    }
  `]
})

export class SocialFeedComponent {
  @Input() comments: SocialFeedComment [] = [];
  @Input() user: {name: string, img?: string}; 
  private text: string;

  commitComment(text: string) {
    if(text) {
      let comment = {
        user: {
          name: this.user.name,
          img: this.user.img
        },
        time: new Date(),
        text: text
      };
      this.comments.push(comment);
      this.text = null;
    }
  };

  constructor() { }
}

export class SocialFeedComment {
  user: {
    name?: string;
    img?: string;
  };
  time: Date;
  text: string;
}

// tslint:disable-next-line:max-line-length
