import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name:String;
  email:String;
  password:String;
  apartmentId:String;
  conf_password:String;
  constructor(
    private validateService:ValidateService,
    private authService:AuthService,    
    private flashMessage:FlashMessagesService,
    private router:Router,  
  ) {    
   }

  ngOnInit() {
    if(localStorage.getItem('type')=='user'){
      this.authService.userAccess = true
    }
    else{
      this.authService.adminAccess = true
    }
  }

  onRegisterSubmit(){
    if(this.password == this.conf_password){
    const user = {
      name:this.name,
      email:this.email,
      password:this.password,
      apartmentId:this.apartmentId
    }
  if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields',{cssClass:'alert-danger',timeout:3000})
      return false;  
    }
  
  if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please fill a valid Email',{cssClass:'alert-danger',timeout:3000})
      return false;  
    }
  
    this.authService.registerUser(user).subscribe(data=>{
      if(data.success){
        this.flashMessage.show('You are now registered!',{cssClass:'alert-success',timeout:3000})
        this.router.navigate(['/admindashboard'])
      }
      else{
        this.flashMessage.show('Something went Wrong',{cssClass:'alert-danger',timeout:3000})
        this.router.navigate(['/register'])
      }
    })
       
  }
else{
  this.flashMessage.show('Enter passwords are not similar',{cssClass:'alert-danger',timeout:3000})
  this.router.navigate(['/register']);
}
  
}
}
