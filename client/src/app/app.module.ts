/**
 * Angular modules
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule }   from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

/**
 * Components
 */
import { AppComponent } from './app.component';
import { ApplicationComponent } from './application/application.component';
import { SidebarComponent } from './application/sidebar/sidebar.component';
import { NavigationComponent } from './application/navigation/navigation.component';
import { FooterComponent } from './application/footer/footer.component';
import { SearchComponent } from './application/navigation/search/search.component';
import { MessageComponent } from './application/navigation/message/message.component';
import { NotificationComponent } from './application/navigation/notification/notification.component';
import { IboxComponent } from './application/interface/ibox/ibox.component';
import { IboxTitleComponent } from './application/interface/ibox/ibox-title/ibox-title.component';
import { IboxToolstripComponent } from './application/interface/ibox/ibox-toolstrip/ibox-toolstrip.component';
import { IboxMetadataComponent } from './application/interface/ibox/ibox-metadata/ibox-metadata.component';
import { IboxContentComponent } from './application/interface/ibox/ibox-content/ibox-content.component';
import { WizardComponent } from './application/interface/elements/wizard/wizard.component';
import { PanelComponent } from './application/interface/elements/panel/panel.component';
import { ContainerComponent } from './application/interface/elements/container/container.component';
import { ElementsComponent } from './application/interface/elements/elements/elements.component';
import { ModalComponent } from './application/interface/elements/modal/modal.component';
import { TextboxComponent } from './application/interface/elements/textbox/textbox.component';
import { CheckboxComponent } from './application/interface/elements/checkbox/checkbox.component';
import { RadioComponent } from './application/interface/elements/radio/radio.component';
import { DropdownComponent } from './application/interface/elements/dropdown/dropdown.component';
import { DatatableComponent } from './application/interface/elements/datatable/datatable.component';
import { TextblockComponent } from './application/interface/elements/textblock/textblock.component';
import { DlistComponent } from './application/interface/elements/dlist/dlist.component';
import { AccordionComponent } from './application/interface/elements/accordion/accordion.component';
import { SigninComponent } from './application/signin/signin.component';
import { ResetComponent } from './application/signin/reset/reset.component';
import { OperatorComponent } from './application/sidebar/operator/operator.component';
import { HomeComponent } from './application/interface/home/home.component';
import { DashboardComponent } from './application/interface/dashboard/dashboard.component';
import { TeamComponent } from './application/interface/team/team.component';
import { AttachmentComponent } from './application/interface/elements/attachment/attachment.component';
import { ListComponent } from './application/interface/list/list.component';
import { ButtonComponent } from './application/interface/elements/button/button.component';

/**
 * Services
 */
import { SidebarService } from './application/sidebar/sidebar.service';
import { InterfaceService } from './application/interface/interface.service';
import { SigninService } from './application/signin/signin.service';
import { ApplicationService } from './application/application.service';
import { MessageService } from './application/navigation/message/message.service';
import { NotificationService } from './application/navigation/notification/notification.service';
import { FeedService } from './application/interface/elements/feed.service';
import { ButtonService } from './application/interface/elements/button/button.service';
/**
 * Guards
 */
import { SigninGuard } from './application/signin/signin.guard';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
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
    IboxComponent,
    IboxTitleComponent,
    IboxToolstripComponent,
    IboxMetadataComponent,
    IboxContentComponent,
    PanelComponent,
    WizardComponent,
    ContainerComponent,
    ElementsComponent,
    ModalComponent,
    TextboxComponent,
    CheckboxComponent,
    RadioComponent,
    DropdownComponent,
    DatatableComponent,
    TextblockComponent,
    DlistComponent,
    AccordionComponent,
    SigninComponent,
    ResetComponent,
    OperatorComponent,
    HomeComponent,
    DashboardComponent,
    TeamComponent,
    AttachmentComponent,
    ListComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: SigninComponent,
        children: [
          { path: 'reset', component: ResetComponent }
        ]
      },
      {
        path: 'secure',
        component: ApplicationComponent,
        canActivate: [SigninGuard],
        canActivateChild: [SigninGuard],
        children: [
          { path: 'interface/:interface', component: IboxComponent},
          { path: 'interface/:interface/:record', component: IboxComponent },
          { path: 'record/:record', component: IboxComponent },
          { path: 'home', component: HomeComponent },
          { path: '**', component: HomeComponent }
        ]
      }
    ])
  ],
  providers: [
    SigninGuard,
    SidebarService,
    InterfaceService,
    SigninService,
    ApplicationService,
    MessageService,
    NotificationService,
    FeedService,
    ButtonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


// tslint:disable-next-line:max-line-length
