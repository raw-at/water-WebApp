import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  name:String;
  password:String;
  constructor(
    private authService:AuthService,    
    private flashMessage:FlashMessagesService,
    private router:Router,) { }

  ngOnInit() {
  }
  
  onLoginSubmit(){
    const user = {
      name:this.name,
      password:this.password,
    }

    this.authService.authenticateAdmin(user).subscribe(data=>{
      if(data.success){
        localStorage.setItem('type','admin')
        this.authService.storeUserData(data.token,data.user);
        this.flashMessage.show('You are now logged In!',{cssClass:'alert-success',timeout:1000})
        this.router.navigate(['admindashboard']);
        if(data.user.type == 'admin'){
          
                    this.authService.adminAccess = true;
          
        }
      }else{
        this.flashMessage.show(data.msg,{cssClass:'alert-danger',timeout:1000})
        this.router.navigate(['admin']);
      }
    })
  }
}
