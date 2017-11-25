import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name:String;
  password:String;
  apartmentId:String;
  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService,
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      name:this.name,
      password:this.password,
      //apartmentId:this.apartmentId
      
    }

    this.authService.authenticateUser(user).subscribe(data=>{
    
      if(data.success){
        console.log('hi',data)
      
        localStorage.setItem('type','user')  
        this.authService.storeUserData(data.token,data.user);
        this.flashMessage.show('You are now logged In!',{cssClass:'alert-success',timeout:1000})
        this.router.navigate(['userdashboard']);
        
        if(data.user.type == 'user'){
          this.authService.userAccess = true;
        
          localStorage.setItem('id',data.user.appartmentId)
          //console.log('appartment',this.authService.appartment)
        }
      }else{
        this.flashMessage.show(data.msg,{cssClass:'alert-danger',timeout:1000})
        this.router.navigate(['login']);
      }
    })
  }

}
