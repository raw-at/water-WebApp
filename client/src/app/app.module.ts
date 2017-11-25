import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule,Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuards} from './guards/auth.guard';
import { ChartsModule } from 'ng2-charts';
import { UserManagersComponent } from './components/user-managers/user-managers.component';

const appRoutes:Routes = [
{path:'',component:HomeComponent},
{path:'register',component:RegisterComponent},
{path:'login',component:LoginComponent},
{path:'userdashboard',component:UserDashboardComponent,canActivate:[AuthGuards]},
{path:'admindashboard',component:AdminDashboardComponent},
{path:'admin',component:AdminComponent},
{path:'profile',component:ProfileComponent,canActivate:[AuthGuards]},
{path:'usermanagers',component:UserManagersComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    ProfileComponent,
    UserManagersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    ChartsModule

  ],
  providers: [ValidateService,AuthService,AuthGuards],
  bootstrap: [AppComponent]
})
export class AppModule { }
