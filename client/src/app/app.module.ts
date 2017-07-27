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
} from './application/interface/ui-elements.component';
import {
  InterfaceComponent,
  WorkflowComponent,
  ToolstripComponent,
  FormPanelComponent
} from './application/interface/interface.component';
/**
 * Services
 */
import { SidebarService } from './application/sidebar/sidebar.service';
import { InterfaceService } from './application/interface/interface.service';
import { GuiComponent } from './application/interface/gui/gui.component';
import { NeptuneIboxComponent } from './application/interface/neptune-ibox/neptune-ibox.component';
import { IboxTitleComponent } from './application/interface/neptune-ibox/ibox-title/ibox-title.component';
import { IboxToolstripComponent } from './application/interface/neptune-ibox/ibox-toolstrip/ibox-toolstrip.component';
import { IboxMetadataComponent } from './application/interface/neptune-ibox/ibox-metadata/ibox-metadata.component';
import { IboxContentComponent } from './application/interface/neptune-ibox/ibox-content/ibox-content.component';


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
    FormPanelComponent,
    GuiComponent,
    NeptuneIboxComponent,
    IboxTitleComponent,
    IboxToolstripComponent,
    IboxMetadataComponent,
    IboxContentComponent
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
      {path: 'interface/:interface/entity/:entity/workitem/:workitem', component: InterfaceComponent}
    ])
  ],
  providers: [
    SidebarService,
    InterfaceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
