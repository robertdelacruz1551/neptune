/**
 * Angular modules
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

/**
 * Components
 */
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { ApplicationComponent } from './application/application.component';
import { SidebarComponent } from './application/sidebar/sidebar.component';
import { NavigationComponent } from './application/navigation/navigation.component';
import { FooterComponent } from './application/footer/footer.component';
import { SearchComponent } from './application/navigation/search/search.component';
import { MessageComponent } from './application/navigation/message/message.component';
import { NotificationComponent } from './application/navigation/notification/notification.component';
import {
  TextboxComponent,
  RadioComponent,
  CheckboxComponent,
  DropdownComponent,
  DatatableComponent,
  ModalComponent,
  TextblockComponent,
  InterfaceElementsComponent,
  AttachmentComponent,
  CommentComponent
} from './application/interface/templates.component';
import {
  InterfaceComponent,
  WorkflowComponent,
  ToolstripComponent
} from './application/interface/interface.component';
import {
  InterfaceDesignerComponent
} from './application/interface/designer/designer.component';
/**
 * Services
 */
import { SidebarService } from './application/sidebar/sidebar.service';
import { InterfaceService } from './application/interface/interface.service';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    SigninComponent,
    ApplicationComponent,
    NavigationComponent,
    SearchComponent,
    MessageComponent,
    NotificationComponent,
    TextboxComponent,
    RadioComponent,
    CheckboxComponent,
    DropdownComponent,
    DatatableComponent,
    ModalComponent,
    InterfaceComponent,
    WorkflowComponent,
    TextblockComponent,
    CommentComponent,
    InterfaceElementsComponent,
    AttachmentComponent,
    ToolstripComponent,
    InterfaceDesignerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: '', component: InterfaceComponent},
      {path: 'interface/:interface', component: InterfaceComponent},
      {path: 'interface/:interface/workitem/:workitem', component: InterfaceComponent},
      {path: 'interface/:interface/workitem/:workitem/entity/:entity', component: InterfaceComponent},
      {path: 'interface/:interface/entity/:entity', component: InterfaceComponent},
      {path: 'neptune/designer/interface/:interface', component: InterfaceDesignerComponent},
    ])
  ],
  providers: [
    SidebarService,
    InterfaceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
