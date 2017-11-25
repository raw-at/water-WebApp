import { Injectable } from '@angular/core';
import {Http,Headers,URLSearchParams, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';


@Injectable()
export class AuthService {

  authToken:any;
  user:any;
  userAccess:any;
  adminAccess:any;
  appartment:any;

  constructor(private http:Http) { 
    this.userAccess=false;
    this.adminAccess = false;
  }

  registerUser(user){
    let headers = new Headers();
    
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register',user,{headers:headers}).map(
      res=>res.json());
  }
  authenticateUser(user){
    let headers = new Headers();
    this.loadToken();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate',user,{headers:headers}).map(
      res=>res.json());
  }
  authenticateAdmin(user){
    let headers = new Headers();
    this.loadToken();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticateAdmin',user,{headers:headers}).map(
      res=>res.json());
  }
  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/profile',{headers:headers}).map(
      res=>res.json());
  }
  getAllUsername(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/userAll',{headers:headers}).map(
      res=>res.json());
  }
  
  updateUser(newUser){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.put('http://localhost:3000/users/updateUser',newUser,{headers:headers}).map(
      res=>res.json());
  }
  deleteUser(id){
    console.log(id)
    this.loadToken();
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',this.authToken);
    return this.http.post('http://localhost:3000/users/deleteUser',id,{headers:headers}).map(
      res=>res.json());
  }

  getAllUserdetails(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/userAlldetails',{headers:headers}).map(
      res=>res.json());
  }
    
  getTank(timestamp){
    let headers = new Headers();
    let myparams = new URLSearchParams();
    myparams.append('timestamp',timestamp);
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    let options = new RequestOptions({headers:headers,search:myparams}) 
    return this.http.get('http://localhost:3000/users/tank',options).map(
      res=>res.json());
  }

  getUserWater(finalObj){
    let headers = new Headers();
    let myparams = new URLSearchParams();
    myparams.append('starttimestamp',finalObj.starttimestamp);
    myparams.append('endtimestamp',finalObj.endtimestamp);
    myparams.append('appartmentIds',finalObj.appartmentId);
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    let options = new RequestOptions({headers:headers,search:myparams}) 
    return this.http.get('http://localhost:3000/users/userwater',options).map(
      res=>res.json());
  }
  getCurrentTankStatus(timestamp){
    let headers = new Headers();
    let myparams = new URLSearchParams();
    myparams.append('timestamp',timestamp);
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    let options = new RequestOptions({headers:headers,search:myparams}) 
    return this.http.get('http://localhost:3000/users/currenttank',options).map(
      res=>res.json());
  }

getUserWaterByAdmin(finalObj){
  let headers = new Headers();
  let myparams = new URLSearchParams();
  myparams.append('starttimestamp',finalObj.starttimestamp);
  myparams.append('endtimestamp',finalObj.endtimestamp);
  myparams.append('appartmentIds',finalObj.appartmentId);
  this.loadToken();
  headers.append('Authorization',this.authToken);
  headers.append('Content-Type','application/json');
  let options = new RequestOptions({headers:headers,search:myparams}) 
  return this.http.get('http://localhost:3000/users/getUserWaterByAdmin',options).map(
    res=>res.json());

}
  storeUserData(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
     const token = localStorage.getItem('id_token');
     this.authToken = token;
  }
  
  loggedIn(){
    return tokenNotExpired('id_token');
}
  

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
