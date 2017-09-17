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
import { PanelComponent } from './application/interface/elements/wizard/panel/panel.component';
import { ContainerComponent } from './application/interface/elements/wizard/panel/container/container.component';
import { ElementsComponent } from './application/interface/elements/wizard/panel/container/elements/elements.component';
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
import { UsersComponent } from './application/interface/neptune/users/users.component';
import { UserComponent } from './application/interface/neptune/user/user.component';
import { ProfileComponent } from './application/interface/neptune/user/profile/profile.component';
import { RolesComponent } from './application/interface/neptune/roles/roles.component';
import { RoleComponent } from './application/interface/neptune/role/role.component';
import { TenantComponent } from './application/interface/neptune/tenant/tenant.component';

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
import { UsersService } from './application/interface/neptune/users/users.service';
import { UserService } from './application/interface/neptune/user/user.service';

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
    UsersComponent,
    UserComponent,
    RolesComponent,
    RoleComponent,
    TenantComponent,
    ProfileComponent
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
        children: [
          // Neptune interfaces. These pages are locally stored.
          // A role check will take place to see if the user has 
          // access to the interface before opening
          { path: 'users', component: UsersComponent },
          { path: 'user/:id', component: UserComponent },
          { path: 'user/profile', component: ProfileComponent },
          { path: 'tenant/profile', component: TenantComponent },
          { path: 'roles', component: RolesComponent },
          // { path: 'notofications', component: NotificationsComponent },
          // { path: 'notification/:id', component: NotificationComponent },
          { path: 'role/:id', component: RoleComponent },
          { path: 'home', component: HomeComponent }, // home does not have need role
          // These interfaces are templates for use to generate custom interfaces
          { path: ':id', component: IboxComponent },
          { path: 'list/:id', component: ListComponent },
          { path: 'box/:id', component: IboxComponent },
          { path: 'dashboard/:id', component: DashboardComponent },
          { path: 'team', component: TeamComponent }
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
    UsersService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


// tslint:disable-next-line:max-line-length