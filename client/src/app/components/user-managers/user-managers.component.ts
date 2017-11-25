import { Component, OnInit } from '@angular/core';

import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-user-managers',
  templateUrl: './user-managers.component.html',
  styleUrls: ['./user-managers.component.css']
})
export class UserManagersComponent implements OnInit {
  user_name_list:any;
  user_identity:any;
  final_user_identity_list:any;
  user:any;
  appartmentId:any;
  email:any;
  name:any;
  inputElement:any;
  table_view:any;
  constructor(
    private authService:AuthService,    
    private flashMessage:FlashMessagesService,
    private router:Router,) { }

  ngOnInit() {
    this.user_name_list = [];
    this.user_identity= [];
    this.final_user_identity_list = [];
    this.getUserName();
    this.user = {};
    this.table_view = true;
    if(localStorage.getItem('type')=='user'){
      this.authService.userAccess = true
    }
    else{
      this.authService.adminAccess = true
    }
    this.authService.loadToken()

  }

  getUserName(){
    this.authService.getAllUserdetails().subscribe(data=>{
      this.user_name_list = data['user_data'];
      /*
      for(var i=0;i<this.user_name_list.length;i++){
        this.user_identity[this.user_name_list['appartmentId']] = this.user_name_list['name']
        this.final_user_identity_list = this.user_identity;
        console.log(this.final_user_identity_list)
        
      }
      */
    });
  }
update(i){
  this.table_view = false;
  console.log(this.user_name_list)
  this.name = this.user_name_list[i]['name'];
  this.email = this.user_name_list[i]['email'];
  this.appartmentId = this.user_name_list[i]['appartmentId'];

  
}
delete(i){
  var user_id = {id:this.user_name_list[i]['appartmentId']};
  this.authService.deleteUser(user_id).subscribe(data=>{
    if(data['msg']=='success'){
      this.flashMessage.show('Deletion Done',{cssClass:'alert-success',timeout:1000})
      
      //this.user_name_list = data['user_data'];
      setTimeout(()=>{location.reload()},1000)
    }
  })
}
Submit(){
  var final_object = {name:this.name,email:this.email,appartmentId:this.appartmentId}
  this.authService.updateUser(final_object).subscribe(data=>{
    if(data['msg']=='success'){
      this.flashMessage.show('Update Done',{cssClass:'alert-success',timeout:1500})
      location.reload()
      this.table_view = true
    }
  })
}

}
