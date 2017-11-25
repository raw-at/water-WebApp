import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  total_tank_data:any;
  time_data:Array<any>;
  water_data:Array<any>;
  lineChartData:Array<any> = []
  lineChartLabels:Array<any>
  lineChartOptions:any
  lineChartColors:Array<any>
  lineChartLegend:boolean
  lineChartType:string
  user_time:any;
  user_water:any;
  user_water_data:any;
  waterlineData:any;
  waterLabels:any;
  todaytimestamp:any;
  timestamp:any;
  dd:any;
  mm:any;
  yy:any;
  hh:any;
  ss:any;
  min:any;
  date:any;
  sdate:any;
  edate:any;
  stime:any;
  etime:any;
  total_water:any;
  hour:Array<any>;
  finalObj:any;
  tank_current_value:any;
  current_hour:any;
  temp:any;

  startTimestamp:any;
  endTimestamp:any;
  dateParts:any;
  timeParts:any;
  id:any;
  counter:any;
  constructor(    private authService:AuthService,    
    private flashMessage:FlashMessagesService,
    private router:Router,) { }

  ngOnInit() {
    this.time_data = [];
    this.water_data = [];
    this.user_time = [];
    this.hour = [];
    this.user_water = [];
    var today = new Date();
    this.dd = today.getDate();
    this.mm = today.getMonth();
    this.yy = today.getFullYear();
    this.current_hour = today.getHours();
    this.hh = '08';
    this.min = '00';
    this.ss = '00';
    this.timestamp = new Date(Date.UTC(this.yy,this.mm,this.dd,this.hh,this.min,this.ss))
    this.timestamp = this.timestamp.getTime()/1000;
    this.finalObj = {};
    if(localStorage.getItem('type')=='user'){
      this.authService.userAccess = true
    }
    else{
      this.authService.adminAccess = true
    }
    this.id = localStorage.getItem('id');
    this.counter = 1;
    this.getTankData()
    this.getUserData();
    
  }
  getTankData(){
    var i;
    this.authService.getTank(this.timestamp).subscribe(data=>{
      this.hour = []
      this.datetimeConverter(data['tank'])
      
      this.total_tank_data = [];
      this.total_tank_data = data['tank']
      this.lineChartData = [];
      this.lineChartLabels = [];
      //console.log(this.total_tank_data)
      for(i=0;i<this.total_tank_data.length;i++ ){
        //this.time_data[i] = String(this.total_tank_data[i]['timestamp']);
        this.water_data[i]=parseInt(this.total_tank_data[i]['liters']);
      }
      this.lineChartData=[
        {data: this.water_data, label: 'Tank'}
      ];
      this.lineChartLabels= this.hour;
      this.lineChartOptions= {
        responsive: true
      };
      this.lineChartColors = [
        { // grey
          backgroundColor: 'rgba(0,255,255,0.6)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        
      ];
      this.lineChartLegend= true;
      this.lineChartType= 'line';
   
    });
    
    setInterval(()=>{
      this.getTankData(); 
    },300000);
    var temp_time = new Date(Date.UTC(this.yy,this.mm,this.dd,this.current_hour))
    var current_time= temp_time.getTime()/1000;
    console.log(current_time);
  
    this.authService.getCurrentTankStatus(current_time).subscribe(data=>{
      if(data['tank'][0]['liters']!=undefined){

        this.tank_current_value = data['tank'][0]['liters'];
        
      }
    })
  }
  
  getUserData(){
    var i;
    if(this.counter == 1){
      this.temp = "Current Water Consumption"
      this.finalObj = {'appartmentId':this.id,'starttimestamp':this.timestamp,'endtimestamp':this.timestamp+86400}
      
    }
    console.log('finalObj',this.finalObj)
    this.authService.getUserWater(this.finalObj).subscribe(data=>{
      this.user_water_data = [];
      this.user_water_data = data['tank']
      this.waterlineData = [];
      this.waterLabels = [];
      this.hour = [];
      this.datetimeConverter(data['tank'])
      

      //console.log(this.user_water_data);
    
      //console.log(data)
      
      
      for(i=0;i<this.user_water_data.length;i++ ){
        //this.user_time[i] = String(this.user_water_data[i]['datetime']);
        this.user_water[i]=parseInt(this.user_water_data[i]['liters']);
      }
      
      this.waterlineData=[
        {data: this.user_water, label: 'User Water'}
      ];
      this.waterLabels= this.hour;
      this.lineChartOptions= {
        responsive: true
      };
      this.lineChartColors = [
        { // grey
          backgroundColor: 'rgba(0,255,255,0.6)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        
      ];
      this.lineChartLegend= true;
      this.lineChartType= 'line';
      this.total_consumption()
   
    });
    
    setInterval(()=>{
      this.getUserData();
    },300000);
    
  };
  datetimeConverter(timestampArray){
    for(var i =0;i<timestampArray.length;i++){
      var t = new Date(timestampArray[i]['timestamp']*1000)
      this.date = t.getDate()+'-'+(t.getMonth()+1)+'-'+t.getFullYear()
      this.hour.push(t.toISOString().substring(11,13))
    }
  
    
  }
  querySearch(){
  this.startTimestamp = "";
  this.endTimestamp = "";
  this.dateParts = this.sdate.split('-')
  this.timeParts = this.stime.split('-')
  
  
  this.startTimestamp = new Date(Date.UTC(this.dateParts[0],this.dateParts[1]-1,this.dateParts[2],this.timeParts[0],this.timeParts[1],this.timeParts[2])).getTime()/1000
  
  this.dateParts = this.edate.split('-')
  this.timeParts = this.etime.split('-')
  
  
  this.endTimestamp = new Date(Date.UTC(this.dateParts[0],this.dateParts[1]-1,this.dateParts[2],this.timeParts[0],this.timeParts[1],this.timeParts[2])).getTime()/1000
  console.log(this.startTimestamp);
  console.log(this.endTimestamp);
  
  this.finalobjectmaker()
}

finalobjectmaker(){
  this.finalObj = {};
  this.counter+=1;
  this.temp = "Searched Water Consumption"
  this.finalObj = {'appartmentId':this.id,'starttimestamp':this.startTimestamp,'endtimestamp':this.endTimestamp}
  console.log(this.finalObj)
  this.getUserData()
  
}
total_consumption(){
  this.total_water = 0;
  for(var i=0;i<this.user_water.length;i++){
    this.total_water += this.user_water[i]
  }
  console.log(this.total_water)
}
}

