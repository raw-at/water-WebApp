import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  val:any;
  constructor(
    private authService:AuthService,    
    private flashMessage:FlashMessagesService,
    private router:Router,
  ) { }

  ngOnInit() {
    this.authService.loadToken()
    this.val = this.authService.loggedIn()
    
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('You are logged out!',{cssClass:'alert-warning',timeout:1000})
    if(this.authService.userAccess){
      this.router.navigate(['/login'])
      
    }
    else if(this.authService.adminAccess){
      this.router.navigate(['/admin'])
      
    }
    return false;
  }

}
