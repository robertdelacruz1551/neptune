import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
//declare var jQuery: any;
/**
 * The textbox component requires a 
 * configuratoin object passed to it.
 * 
 * use:
   <textbox 
     [config]="configuration" 
     [bind]="textProperty" 
     (update)="textProperty=$event"
   </textbox>
 */
@Component({
  selector: 'textbox',
  template: `
  <div class="form-group">
    <label class="col-sm-4 control-label" [innerHtml]="config.label.text"></label>
    <div [ngClass]="(!config.input.size || config.input.size == 'large' || config.input.size == '8' )?'col-sm-8': { 'small' : 'col-sm-2', 'medium' : 'col-sm-4', '1' : 'col-sm-1', '2' : 'col-sm-2', '3' : 'col-sm-3', '4' : 'col-sm-4', '5' : 'col-sm-5', '6' : 'col-sm-6', '7' : 'col-sm-7' }[config.input.size]">
      <input type="text" class="form-control input-sm" [name]="config.input.name"[placeholder]="config.input.placeholder || '' " [attr.readonly]="config.input.readonly" [(ngModel)]="bind" (ngModelChange)="update.emit(this.bind)">
    </div>
  </div>
  `,
  styles: [`
  .form-group, .form-control {
    font-size: 11px;
  }
  `]
})
export class TextboxComponent implements OnInit{
  @Input() config: TextBoxConfig;
  @Input() bind: string;
  @Output() update = new EventEmitter();

  ngOnInit() {}
}

export class TextBoxConfig {
  label: { text?: string; };
  input: { readonly?: boolean; name: string; placeholder?: string; size?: string; };
  rules?: { showIf?: string; }
}


@Component({
  selector: 'textblock',
  template: `
    <div class="form-group">
      <label class="col-sm-4 control-label" [innerHtml]="config.label.text"></label>
      <div [ngClass]="(config.label.text)? 'col-sm-8':'col-sm-12'">
        <textarea class="form-control" [rows]="config.input.rows || 3" [name]="config.input.name" [placeholder]="config.input.placeholder || '' " [(ngModel)]="bind" (ngModelChange)="update.emit(this.bind)"></textarea>
      </div>
    </div>
  `,
  styles: [`
    .form-group, .form-control {
      font-size: 11px;
    }
  `]
})

export class TextblockComponent {
  @Input() config: TextBlockConfig;
  @Input() bind: string;
  @Output() update = new EventEmitter();
  constructor() { }
}

export class TextBlockConfig {
  label: { text?: string; };
  input: { readonly?: boolean; name: string; placeholder?: string; rows?: number};
  rules?: { showIf?: string; }
}

/**
 * ==============
 * Usage
 * ==============           
  config: {
    label: { text: 'Some label text' },
    input: {
      options: [
        { name: 'opt1', text: 'Option 1' },
        { name: '{key: "value"}', text: 'Option 2' },
        { name: 88, text: 'Option 3' }
      ]
    }
  }
 */

@Component({
  selector: 'checkbox',
  template: `
  <div class="form-group">
    <label class="col-sm-4 control-label" [innerHtml]="config.label.text"></label>
    <div class="col-sm-8">
      <div *ngFor="let option of config.input.options" class="checkbox">
        <label>
          <input type="checkbox" [name]="option.name" [value]="option.value || option.text" [checked]="isChecked(option.value || option.text)" (change)="updateArray((option.value || option.text), $event.target.checked); update.emit(this._bind)">
          {{option.text}}
        </label>
      </div>
    </div>
  </div>
  `,
  styles: [`
  .form-group {
    font-size: 11px;
  }
  `]
})
export class CheckboxComponent implements OnInit{
  @Input() config: CheckboxConfig;
  @Input() bind: any [] = [];
  @Output() update = new EventEmitter();

  private _bind: any [] = [];

  updateArray(value, checked) {
    if( checked ) { 
      this._bind.push(value)
    }else if( !checked ) {
      let i = this._bind.indexOf(value);
      this._bind.splice(i, 1);
    }
  }

  isChecked(value): boolean {
    if(!this._bind || this._bind.indexOf(value) === -1) {
      return false;
    } else { return true; };
  }

  ngOnInit() {
    if(this.bind) this._bind = this.bind;
  }
}

export class CheckboxConfig {
  label: { text: string; };
  input: { readonly?: boolean; options: { name?: string; value?: any; text: string }[]; };
}







@Component({
  selector: 'radio',
  template: `
   <div class="form-group">
    <label class="col-sm-4 control-label" [innerHtml]="config.label.text"></label>
    <div class="col-sm-8">
      <div *ngFor="let option of config.input.options" class="radio">
        <label>
          <input type="radio" [name]="config.input.name" [(ngModel)]="bind" (ngModelChange)="update.emit(this.bind)" [value]="option.value"> 
          {{option.text}}
        </label>
      </div>
    </div>
  </div>
  `,
  styles: [`
  .form-group {
    font-size: 11px;
  }
  `]
})
export class RadioComponent {
  @Input() config: RadioConfig;
  @Input() bind: string;
  @Output() update = new EventEmitter();
}

export class RadioConfig {
  label: { text: string; };
  input: { readonly?: boolean; name: string; options: { value: any; text: string; } []};
}






@Component({
  selector: 'dropdown',
  template: `
  <div class="form-group">
    <label class="col-sm-4 control-label" [innerHtml]="config.label.text"></label>
    <div [ngClass]="(!config.input.size || config.input.size == 'large' || config.input.size == '8' )?'col-sm-8': { 'small' : 'col-sm-2', 'medium' : 'col-sm-4', '1' : 'col-sm-1', '2' : 'col-sm-2', '3' : 'col-sm-3', '4' : 'col-sm-4', '5' : 'col-sm-5', '6' : 'col-sm-6', '7' : 'col-sm-7' }[config.input.size]">
      <select *ngIf="!config.input.readonly" class="form-control input-sm" [name]="config.input.name" [(ngModel)]="bind" (ngModelChange)="update.emit(this.bind)">
        <option *ngIf="config.input.emptyOption" value=""></option>
        <option *ngFor="let option of config.input.options" [value]="option.value" [innerHtml]="option.text"></option>
        <option *ngIf="config.input.otherOption" value="other">Other</option>
      </select>
    </div>
  </div>
  `,
  styles: [`
  .form-group, .form-control {
    font-size: 11px;
  }
  `]
})
export class DropdownComponent {
  @Input() config: DropdownConfig;
  @Input() bind: string;
  @Output() update = new EventEmitter();

  otherSelected: boolean;
}

export class DropdownConfig {
  label: { text: string; };
  input: { readonly?: boolean; size?: string; name: string; emptyOption?: boolean; otherOption?: boolean; options: { value: string; text: string; }[] };
}


/**
 * Usage:
   <datatable
    [config]="{
      size: 'fill',
      headers: { 
        key: string; 
        text: string; 
      } [];
      action: {
        enable: boolean;
        button?: {
          add?:  { enable: boolean; modal: DatatableModalConfig; };
          view?: { enable: boolean; modal: DatatableModalConfig; };
          edit?: { enable: boolean; modal: DatatableModalConfig; };
          delete?: { enable: boolean; message?: string; };
        }
      };
    }"
    [dataset]="datasource"
   ></datatable>
 */
@Component({
  selector: 'datatable',
  template: `
  <div class="row">
    <label *ngIf="config.label" class="col-sm-4 control-label" [innerHtml]="config.label.text"></label>
    <div [ngClass]="(!config.size)?'col-sm-12': (config.label)? {'small': 'col-sm-4', 'medium': 'col-sm-6', 'large': 'col-sm-8'}[config.size] : {'small': 'col-sm-offset-4 col-sm-4', 'medium': 'col-sm-offset-4 col-sm-6', 'large': 'col-sm-offset-4 col-sm-8'}[config.size]">
      <table class="table table-hover datatable" [id]="datasetId">
        <thead>
          <tr>
            <th *ngIf="config.action.enable">
              <input type="checkbox" [(ngModel)]="allSelected" (change)="select($event.target.checked)">
              <a *ngIf="config.action.button.add.enable  && config.action.button.add.modal" class="text-default datatable-icon" data-toggle="modal" [attr.data-target] = "'#addmodal'  + datasetId" > <span class="glyphicon glyphicon-plus-sign"></span></a>
              <a *ngIf="config.action.button.delete.enable && rowsSelected.length > 0" class="text-danger datatable-icon" data-toggle="modal" [attr.data-target]="'#' + deleteModalId"> <span class="glyphicon glyphicon-remove-circle"></span></a>
            </th>
            <th *ngFor="let header of config.headers"  [innerHtml]="header.text"></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let data of dataset; let row = index;">
            <td *ngIf="config.action.enable === true">
              <input type="checkbox" [value]="row" [checked]="allSelected" (change)="rowSelectionChange(row, $event.target.checked);">
              <a class="text-default datatable-icon" data-toggle="modal" [attr.data-target] = "'#editmodal' + datasetId + row"> <span class="glyphicon glyphicon-pencil"></span></a>

              <modal *ngIf="config.action.button.edit.enable && config.action.button.edit.modal"
                [id]="'editmodal' + datasetId + row"
                [datarow]="data"
                [config]= "config.action.button.edit.modal"
                (commit)= "dataset[row] = $event"
              ></modal>
            </td>

            <td *ngFor="let head of config.headers" [innerHtml]="data[head.key]" ></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <modal *ngIf="config.action.button.add.enable && config.action.button.add.modal" 
    [id]="'addmodal' + datasetId"
    [datarow]="{}"
    [config]= "config.action.button.add.modal"
    (commit)= "dataset.push($event)"
  ></modal>
  
  <div class="modal fade" [id]="deleteModalId" tabindex="-1" role="dialog" aria-labelledby="deleteRowModalLabel">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="deleteRowModalLabel">Warning</h4>
        </div>
        <div class="modal-body">
          <p>Delete the selected records?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default btn-action" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-warning btn-action" data-dismiss="modal" (click)="deleteRow()">Delete</button>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
  .datatable > tbody > tr > td, .datatable > thead > tr > th, .datatable > tbody > tr > th, .datatable > tfoot > tr > th, .datatable > thead > tr > td {
    padding: 5px;
    vertical-align: middle;
    font-size: 11px;
  }
  .datatable .btn{
    margin-bottom: 0px;
  }
  .datatable-icon {
    font-size: 13px;
    margin-left: 5px;
  }
  .datatable-data {
    cursor:pointer;
  }
  .control-label {
    font-size: 11px;
  }
  `]
}) // <input type="checkbox" [checked]="allSelected" [name]="datasetId + row" [value]="row" (change)="selectedRow(data); focusOnRow(row);">
export class DatatableComponent {
  @Input() config: DatatableConfig = {
    headers: [], action: { enable: false }
  };
  @Input() dataset: any [];
/**
 * if the user clicks on selected all then set all 
 * the checkboxes in the table to checked
 */private allSelected: boolean;

  select(state: boolean) {
    this.allSelected = state;
    if(state) {
      this.dataset.forEach(row => {
        this.selectedRow(row, true);
      });
    } else {
      this.rowsSelected = [];
    }
  };

/**
 * The unique identifier for the dataset
 */private datasetId = Math.random().toString(36).substring(7); 

/**
 * This property will have the modal key 
 * to delete records from the datatable
 */private deleteModalId = Math.random().toString(36).substring(7);

/**
 * This property is an array 
 * containing the rows selected
 */private rowsSelected: any [] = [];

/**
 * This method sets the row in focus to 
 * view, edit or delete from the dataset
 * @param row: is initialized on click
 */rowSelectionChange(row: number, state: boolean ) {
    var data = this.dataset[row];
    this.selectedRow(data, state);
  };

/**
 * This method sets the row in focus to 
 * view, edit or delete from the dataset
 * @param row: is initialized on click
 */selectedRow(data: any, state: boolean) {
    let row = this.rowsSelected.indexOf(data);
    if(state) {
      this.rowsSelected.push(data);
    } else {
      this.rowsSelected.splice(row, 1)
    }
  };

/**
 * Deletes the row in focus from the dataset
 */deleteRow() {
    this.rowsSelected.forEach(row => {
      let datasetIndex = this.dataset.indexOf(row);
      this.dataset.splice(datasetIndex, 1);
    });
    this.allSelected = false;
    this.rowsSelected= [];
  };
}

export class DatatableConfig {
  size?: string;
  label?: { text: string; };
  headers: { 
    key: string; 
    text: string; 
  } [];
  action: {
    enable: boolean;
    button?: {
      add?:  { enable: boolean; modal: ModalConfig; };
      //view?: { enable: boolean; modal: ModalConfig; };
      edit?: { enable: boolean; modal: ModalConfig; };
      delete?: { enable: boolean; message?: string; };
    }
  };
};


@Component({  
  selector: 'modal',
  template: `
  <div class="modal fade" [id]="id" tabindex="-1" role="dialog" [attr.aria-labelledby]="config.labelBy">
    <div [ngClass]="(!config.size)? 'modal-dialog': { 'small' : 'modal-dialog modal-sm', 'large' : 'modal-dialog modal-lg'}" role="document">
      <div class="modal-content">
        <div *ngIf="config.header.enable" class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" [id]="config.labelBy" [innerHtml]="config.header.text"></h4>
        </div>
        <div class="modal-body">
          <div *ngIf="config.form.message">
            <h3 [innerHtml]="config.form.message.heading"></h3>
            <p [innerHtml]="config.form.message.text"></p>
          </div>
          <div class="form-horizontal">
            
            <interface-elements
              [elements]="config.form.elements"
              [data]="editableDatarow"
              [feed]="feed"
            ></interface-elements>
            
            <!-- [feed]="feed" -->
          </div>
        </div>
        <div *ngIf="config.footer.enable" class="modal-footer">
          <button (click)="cancelChange()" type="button" class="btn btn-default btn-action" data-dismiss="modal">Cancel</button>
          <button *ngIf="config.footer.enable" (click)="commits()" type="button" class="btn btn-warning btn-action" data-dismiss="modal" [innerHtml]="config.footer.commit.text"></button>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .modal-dialog {
      margin-top: 75px;
    }
  `]
})
export class ModalComponent implements OnInit {
  @Input() id: string;
  @Input() datarow: any = {};
  @Input() feed: any [] = []; // used to feed data into a data displaying element like the app-comments element
  @Input() config: ModalConfig;
  @Output() commit = new EventEmitter();
/**
 * Will contain the updated object
 */private editableDatarow: {} = {};

   private setEditableDatarow() {
     this.editableDatarow = JSON.parse(JSON.stringify(this.datarow));
   }
/**
 * If the user cancels the change we 
 * need to reset the updateDatarow object 
 * back to it's unchanged state
 */private cancelChange() {
    this.setEditableDatarow();
  }

  private commits(){
    let editableDatarow = this.editableDatarow;
    this.editableDatarow = {};
    return this.commit.emit(editableDatarow);
  }

/**
 * On init make a copy of the datarow 
 * property to prevent update if user 
 * cancels change.
 */ngOnInit() {
    this.setEditableDatarow();
  }
};

export class ModalConfig {
  labelBy?: string;
  size?: string;
  header: {
    enable: boolean;
    text: string;
  };
  form: {
    message?: {
      heading?: string;
      test?: string;
    },
    elements: {
      type: string; 
      bind: string;
      textbox?: { config: TextBoxConfig };
      checkbox?: { config: CheckboxConfig };
      radio?: { config: RadioConfig };
      dropdown?: { config: DropdownConfig };
      datatable?: { config: DatatableConfig };
      textblock?: { config: TextBlockConfig };
    } [];
  };
  footer: {
    enable: boolean;
    commit: {
      enable: boolean;
      text: string;
      options: {
        clearFormAfterSubmit?: boolean;
      }
    }
  }
}



@Component({
  selector: 'interface-elements',
  template: `
  <div *ngFor="let element of elements">
    
    <textbox *ngIf="element.type === 'textbox'"
      [config]= "element[element.type]"
      [bind]=   "data[element.bind]"
      (update)= "data[element.bind] = $event"
    ></textbox>

    <checkbox *ngIf="element.type === 'checkbox'" 
      [config]= "element[element.type]" 
      [bind]=   "data[element.bind]"
    ></checkbox>

    <radio *ngIf="element.type === 'radio'"    
      [config]= "element[element.type]" 
      [bind]=   "data[element.bind]"
      (update)= "data[element.bind] = $event"
    ></radio>

    <dropdown *ngIf="element.type === 'dropdown'" 
      [config]= "element[element.type]"
      [bind]=   "data[element.bind]"
      (update)= "data[element.bind] = $event"
    ></dropdown>

    <textblock *ngIf="element.type === 'textblock'"
      [config]= "element[element.type]"
      [bind]=   "data[element.bind]"
      (update)= "data[element.bind] = $event"
    ></textblock>

    <datatable *ngIf="element.type === 'datatable'"
      [config]= "element[element.type]"
      [dataset]="data[element.bind]"
    ></datatable>

    <attachment *ngIf="element.type === 'attachment'"
      [config]= "element[element.type]"
      [attachments]="feed" 
    ></attachment>

    <app-comments *ngIf="element.type === 'appcomments'"
      [user]="{name:'Robert De La Cruz', img: '#'}"
      [config]="element[element.type]"
      [comments]="feed"
    ></app-comments>

  </div> 
  `
})

export class InterfaceElementsComponent implements OnInit{
  @Input() data: any;
  @Input() feed: any [] = [];
  @Input() elements: Elements [] = [];
  constructor() { }
  ngOnInit() { }
}

export class Elements {
  type: string; // textbox/checkbox/radio/dropdown/datatable
  bind: string;
  textbox?: TextBoxConfig;
  checkbox?: CheckboxConfig;
  radio?: RadioConfig;
  dropdown?: DropdownConfig;
  datatable?: DatatableConfig;
  textblock?: TextBlockConfig;
  attachment?: AttachmentConfig;
}


@Component({
  selector: 'attachment',
  template: `
  <div class="form-group">
    <div class="input-group">
      <input type="file" class="form-control input-sm" [name]="config.input.name" [attr.readonly]="config.input.readonly" (change)="file = $event.target.files">
      <span class="input-group-btn">
        <button class="btn btn-primary btn-sm" type="button" (click)="attach()" >Save</button>
      </span>
    </div>
  </div>

  <div class="row">
    <table class="table table-hover">
      <tbody>
        <tr *ngFor="let attachment of attachments">
          <td>
            <a class="text-danger" (click)="remove(attachment)"> <span class="glyphicon glyphicon-remove-circle"></span></a>
            <a href="#" [innerHtml]="attachment.file.name"></a>
          </td>
          <td [innerHtml]="attachment.time"></td>
          <td>Robert De La Cruz</td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
  styles: [`
  .form-group, .form-control, .table {
    font-size: 11px;
  }
  .glyphicon-remove-circle {
    margin-right: 7px;
  }
  `]
})
export class AttachmentComponent implements OnInit{
  @Input() config: AttachmentConfig;
  @Input() user: any;
  @Input() attachments: Attachement [] = [];
  private file: File;

  attach() {
    if(this.file) {
      let attachment = {
        user: {},
        time: new Date,
        file: this.file[0]
      };
      this.attachments.push(attachment);
      this.file = null;
    }
  }

  remove(attachment: Attachement) {
    let index = this.attachments.indexOf(attachment);
    this.attachments.splice(index, 1);
  }

  ngOnInit(){ }
}

export class Attachement {
  user: {};
  time: Date;
  file: File;
}

export class AttachmentConfig {
  input: { readonly?: boolean; name: string; };
  rules?: { showIf?: string; }
}



@Component({
  selector: 'app-comments',
  template: `
  <textblock
    [config]="config.input.message"
    [bind]="text" (update)="text = $event"
  ></textblock>

  <button type="button" class="btn btn-primary btn-sm" (click)="comment(text)">Submit</button>
  <button type="button" class="btn btn-default btn-sm pull-right" data-dismiss="modal" aria-label="Close">Close</button>
  
  <div class="hr-line-dashed"></div>
  
  <div *ngFor="let comment of comments; let c = index">
    <div class="social-feed-box">
      <div class="social-avatar">
        <span class="pull-left text-muted glyphicon glyphicon-user" aria-hidden="true"></span>
        <div class="media-body">
          <p class="text-muted" [innerHtml]="comment.user.name"></p>
          <small class="text-muted" [innerHtml]="comment.time"></small>
        </div>
      </div>
      <div class="social-body">
        <p [innerHtml]="comment.text"></p>
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
    margin-bottom: 20px;
  }
  .media-body > p {
    margin-bottom: 0px;
  }
  `]
})

export class CommentComponent implements OnInit {
  @Input() config: CommentConfig;
  @Input() user: {name: string; img?: string}; 
  @Input() comments: {
    user: {
      name?: string;
      img?: string;
    };
    time: Date;
    text: string;
  } [] = [];

  private text: string;

  comment(text: string) {
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
  ngOnInit() {}
}

export class CommentConfig {
  input: {
    message: TextBlockConfig;
  };
  comments: {
    user: {
      image: boolean;
      name: boolean;
      id: boolean;
    };
    datetime: boolean;
  };
}


// tslint:disable-next-line:max-line-length