import { Component, OnInit,ViewChild } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  total_tank_data:any;
  time_data:Array<any>;
  water_data:Array<any>;
  lineChartData:Array<any> = []
  lineChartLabels:Array<any>
  lineChartOptions:any
  lineChartColors:Array<any>
  lineChartLegend:boolean
  lineChartType:string
  data_length:any
  user_name_list:any;
  selectAppartmentId:any;
  sdate:any;
  edate:any;
  stime:any;
  etime:any;
  startTimestamp:any;
  endTimestamp:any;
  dateParts:any;
  timeParts:any;
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
  hour:Array<any>;
  finalObj:any;
  data_container:any;
  required_id:any;
  final_data_list:any;
  water_data_container:any;
  timestamp_data_container:any;
  user_apart_id:any;
  total_data:any;
  total_apart_ids:any;
  object_final:any;
  label_container:any;
  max_label:any;
  user_identity:any;
  final_user_identity_list:any;
  total_liters:any;
  color:any;
  color_array:any;
  date_start:any;
  date_end:any;
  test_array:any;
  object_array:any;
  temp:any;

  temp_water_container:any;
  constructor(
    private authService:AuthService,    
    private flashMessage:FlashMessagesService,
    private router:Router,
     ) { }

  ngOnInit() {
    this.time_data = [];
    this.water_data = [];
    this.user_time = [];
    this.hour = [];
    this.data_container = [];
    this.user_water = [];
    this.selectAppartmentId = [];
    this.final_data_list = {};
    this.water_data_container = [];
    this.timestamp_data_container = [];
    this.test_array = [];
    this.label_container = [];
    this.max_label = [];
    this.total_data=[];
    this.total_apart_ids = [];
    this.final_user_identity_list=[];
    this.temp_water_container = []
    this.object_array = {};
    var today = new Date();
    this.dd = today.getDate();
    this.mm = today.getMonth();
    this.yy = today.getFullYear();
    this.hh = '08';
    this.min = '00';
    this.ss = '00';
    this.color = {};
    this.user_identity = [];
    this.color_array = [];
    this.timestamp = new Date(Date.UTC(this.yy,this.mm,this.dd,this.hh,this.min,this.ss))
    this.timestamp = this.timestamp.getTime()/1000;

    if(localStorage.getItem('type')=='user'){
      this.authService.userAccess = true
    }
    else{
      this.authService.adminAccess = true
    }

    this.getTankData();
    this.getUserName();  
  
  }


  getTankData(){
    var i;
    this.authService.getTank(this.timestamp).subscribe(data=>{
      this.hour = []
      this.datetimeConverter(data['tank'])
     
      this.total_tank_data = [];
      this.total_tank_data = data['tank'];
      this.lineChartData = [];
      this.lineChartLabels = [];
      for(i=0;i<this.total_tank_data.length;i++ ){
        //this.time_data[i] = String(this.total_tank_data[i]['timestamp']);
        this.water_data[i]=parseInt(this.total_tank_data[i]['liters']);
      }
      this.lineChartData=[
        {data: this.water_data, label: 'Tank'}
      ];
      
      this.lineChartLabels= this.hour;
      
      //console.log(this.lineChartLabels)
      this.lineChartOptions= {
        responsive: true
      };
      this.lineChartColors = [
        { // grey
          //backgroundColor: 'rgba(64,164,223,0.6)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        
      ];
      this.lineChartLegend= true;
      this.lineChartType= 'line';
      this.data_length = this.total_tank_data.length; 
      
    });

    setInterval(()=>{
      this.getTankData();
    },300000);
  }

  getUserData(){
    this.total_data = [];
    this.max_label = [];
    this.final_user_identity_list=[];
    this.temp_water_container = [];
    this.test_array = [];
    this.authService.getUserWaterByAdmin(this.finalObj).subscribe(data=>{
      console.log('data: ',data)
      this.final_data_list = data;
      //this.total_data = [];
      /*
      for(var i=0;i<data.length;i++){
      
        for(var j=0;j<data[i].length;j++){
          this.data_container.push({'liters':data[i][j]['liters'],'timestamp':data[i][j]['timestamp']});
          this.required_id = data[i][j]['appartmentId'];
        }
        this.final_data_list[this.required_id] = this.data_container
        this.data_container = []
      }
      */
      for(var i=0;i<this.user_name_list.length;i++){
        var id = String(this.user_name_list[i]['appartmentId']);
        var obj = {}
        obj[id]=this.user_name_list[i]['name']
        this.final_user_identity_list.push(obj)
      }

      console.log(this.final_user_identity_list)

      console.log(this.endTimestamp-this.startTimestamp)
      if(this.endTimestamp-this.startTimestamp<=86400){
        console.log('go')
        /*-------------------------------*/
        for(var i=0;i<data.length;i++){
          for(var j=0;j<data[i].length;j++){
            
            this.water_data_container.push(data[i][j]['liters']);    
            
            var t = new Date(data[i][j]['timestamp']*1000);
            //console.log(t.toISOString())
            this.timestamp_data_container.push(t.toISOString().substring(11,13));
            
            
            //this.timestamp_data_container.push(data[i][j]['timestamp']);
  
            this.user_apart_id = data[i][j]['appartmentId'];
            console.log('user :',this.user_apart_id);    
          }

          for(var k=0;k<this.final_user_identity_list.length;k++){
            //console.log('x',Object.keys(this.final_user_identity_list[k]))
            if(Object.keys(this.final_user_identity_list[k])[0]==this.user_apart_id){
                this.temp = this.final_user_identity_list[k][this.user_apart_id]
            }
          }
          //console.log('user: ',this.user_apart_id);
          this.object_final = {'data':this.water_data_container,'label':this.temp}
          this.total_data.push(this.object_final);
          this.color = { // grey
            backgroundColor: 'rgba('+this.randomColor(i)+','+this.randomColor(i)+',177,0.4)',
            borderColor: 'rgba('+this.randomColor(i)+',159,'+this.randomColor(i)+',0.5)',
            pointBackgroundColor: 'rgba('+this.randomColor(i)+',159,177,0.6)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,'+this.randomColor(i)+',177,0.8)'
          }
          this.color_array.push(this.color)
          this.label_container.push(this.timestamp_data_container)
          this.temp_water_container[i] = this.water_data_container;
          console.log(this.temp_water_container)
          this.water_data_container = [];
          this.timestamp_data_container = [];
          this.user_apart_id = "";        
          
          
          
        }
        /*-------------------------------*/



        
      }
      else if(this.endTimestamp-this.startTimestamp>84600 && this.endTimestamp-this.startTimestamp<=2592000){
        /*-------------------------------*/
        for(var i=0;i<data.length;i++){
          for(var j=0;j<data[i].length;j+=4){
            
            this.water_data_container.push(data[i][j]['liters']);    
            
            var t = new Date(data[i][j]['timestamp']*1000);
            //console.log(t.toISOString())
            this.timestamp_data_container.push(t.toISOString().substring(11,13));
            
            
            //this.timestamp_data_container.push(data[i][j]['timestamp']);
  
            this.user_apart_id = data[i][j]['appartmentId'];
            console.log('user :',this.user_apart_id);    
          }
          //console.log('user: ',this.user_apart_id);
          this.object_final = {'data':this.water_data_container,'label':this.final_user_identity_list[i][this.user_apart_id]}
          this.total_data.push(this.object_final);
          this.color = { // grey
            backgroundColor: 'rgba('+50+','+84+','+this.randomColor(i*2)+',0.4)',
            borderColor: 'rgba('+this.randomColor(i)+',59,'+this.randomColor(i)+',0.5)',
            pointBackgroundColor: 'rgba('+this.randomColor(i)+',159,177,0.6)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,'+this.randomColor(i)+',177,0.8)'
          }
          this.color_array.push(this.color)
          
          this.label_container.push(this.timestamp_data_container)
          this.temp_water_container[i] = this.water_data_container;
          console.log(this.temp_water_container)
          
          this.water_data_container = [];
          this.timestamp_data_container = [];
          this.user_apart_id = "";        
          
          
        }
        /*-------------------------------*/

      }
      else if(this.endTimestamp-this.startTimestamp>2592000 && this.endTimestamp-this.startTimestamp<=5184000){

        /*-------------------------------*/
        for(var i=0;i<data.length;i++){
          for(var j=0;j<data[i].length;j+=12){
            
            this.water_data_container.push(data[i][j]['liters']);    
            
            var t = new Date(data[i][j]['timestamp']*1000);
            //console.log(t.toISOString())
            this.timestamp_data_container.push(t.toISOString().substring(11,13));
            
            
            //this.timestamp_data_container.push(data[i][j]['timestamp']);
  
            this.user_apart_id = data[i][j]['appartmentId'];
            console.log('user :',this.user_apart_id);    
          }
          //console.log('user: ',this.user_apart_id);
          this.object_final = {'data':this.water_data_container,'label':this.final_user_identity_list[i][this.user_apart_id]}
          this.total_data.push(this.object_final);
          this.color = { // grey
            backgroundColor: 'rgba('+this.randomColor(i*2)+','+this.randomColor(i*2)+',177,0.4)',
            borderColor: 'rgba('+this.randomColor(i)+',159,'+this.randomColor(i)+',0.5)',
            pointBackgroundColor: 'rgba('+this.randomColor(i)+',159,177,0.6)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,'+this.randomColor(i)+',177,0.8)'
          }
          this.color_array.push(this.color)
          
          this.label_container.push(this.timestamp_data_container)
          this.temp_water_container[i] = this.water_data_container;
          console.log(this.temp_water_container)
          
          this.water_data_container = [];
          this.timestamp_data_container = [];
          this.user_apart_id = "";        
          
          
        }
        /*-------------------------------*/

      }
      else if(this.endTimestamp-this.startTimestamp>5184000 && this.endTimestamp-this.startTimestamp<=7776000){

        /*-------------------------------*/
        for(var i=0;i<data.length;i++){
          for(var j=0;j<data[i].length;j+=24){
            
            this.water_data_container.push(data[i][j]['liters']);    
            
            var t = new Date(data[i][j]['timestamp']*1000);
            //console.log(t.toISOString())
            this.timestamp_data_container.push(t.toISOString().substring(11,13));
            
            
            //this.timestamp_data_container.push(data[i][j]['timestamp']);
  
            this.user_apart_id = data[i][j]['appartmentId'];
            console.log('user :',this.user_apart_id);    
          }
          //console.log('user: ',this.user_apart_id);
          this.object_final = {'data':this.water_data_container,'label':this.final_user_identity_list[i][this.user_apart_id]}
          this.total_data.push(this.object_final);
          this.color = { // grey
            backgroundColor: 'rgba('+this.randomColor(i*2)+','+this.randomColor(i*2)+',177,0.4)',
            borderColor: 'rgba('+this.randomColor(i)+',159,'+this.randomColor(i)+',0.5)',
            pointBackgroundColor: 'rgba('+this.randomColor(i)+',159,177,0.6)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,'+this.randomColor(i)+',177,0.8)'
          }
          this.color_array.push(this.color)
          
          this.label_container.push(this.timestamp_data_container)
          this.temp_water_container[i] = this.water_data_container;
          console.log(this.temp_water_container)
          
          this.water_data_container = [];
          this.timestamp_data_container = [];
          this.user_apart_id = "";        
          
          
        }
        /*-------------------------------*/

      }
      else if(this.endTimestamp-this.startTimestamp>7776000 && this.endTimestamp-this.startTimestamp<=10368000){

        /*-------------------------------*/
        for(var i=0;i<data.length;i++){
          for(var j=0;j<data[i].length;j+=48){
            
            this.water_data_container.push(data[i][j]['liters']);    
            
            var t = new Date(data[i][j]['timestamp']*1000);
            //console.log(t.toISOString())
            this.timestamp_data_container.push(t.toISOString().substring(11,13));
            
            
            //this.timestamp_data_container.push(data[i][j]['timestamp']);
  
            this.user_apart_id = data[i][j]['appartmentId'];
            console.log('user :',this.user_apart_id);    
          }
          //console.log('user: ',this.user_apart_id);
          this.object_final = {'data':this.water_data_container,'label':this.final_user_identity_list[i][this.user_apart_id]}
          this.total_data.push(this.object_final);
          this.color = { // grey
            backgroundColor: 'rgba('+this.randomColor(i*2)+','+this.randomColor(i*2)+',177,0.4)',
            borderColor: 'rgba('+this.randomColor(i)+',159,'+this.randomColor(i)+',0.5)',
            pointBackgroundColor: 'rgba('+this.randomColor(i)+',159,177,0.6)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,'+this.randomColor(i)+',177,0.8)'
          }
          this.color_array.push(this.color)
          
          this.label_container.push(this.timestamp_data_container)
          this.temp_water_container[i] = this.water_data_container;
          console.log(this.temp_water_container)
          
          this.water_data_container = [];
          this.timestamp_data_container = [];
          this.user_apart_id = "";        
          
          
        }
        /*-------------------------------*/

      }
      else if(this.endTimestamp-this.startTimestamp>10368000 && this.endTimestamp-this.startTimestamp<=20736000){

        /*-------------------------------*/
        for(var i=0;i<data.length;i++){
          for(var j=0;j<data[i].length;j+=72){
            
            this.water_data_container.push(data[i][j]['liters']);    
            
            var t = new Date(data[i][j]['timestamp']*1000);
            //console.log(t.toISOString())
            this.timestamp_data_container.push(t.toISOString().substring(11,13));
            
            
            //this.timestamp_data_container.push(data[i][j]['timestamp']);
  
            this.user_apart_id = data[i][j]['appartmentId'];
            console.log('user :',this.user_apart_id);    
          }
          //console.log('user: ',this.user_apart_id);
          this.object_final = {'data':this.water_data_container,'label':this.final_user_identity_list[i][this.user_apart_id]}
          this.total_data.push(this.object_final);
          this.color = { // grey
            backgroundColor: 'rgba('+this.randomColor(i*2)+','+this.randomColor(i*2)+',177,0.4)',
            borderColor: 'rgba('+this.randomColor(i)+',159,'+this.randomColor(i)+',0.5)',
            pointBackgroundColor: 'rgba('+this.randomColor(i)+',159,177,0.6)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,'+this.randomColor(i)+',177,0.8)'
          }
          this.color_array.push(this.color)
          
          this.label_container.push(this.timestamp_data_container)
          this.temp_water_container[i] = this.water_data_container;
          console.log(this.temp_water_container)
          
          this.water_data_container = [];
          this.timestamp_data_container = [];
          this.user_apart_id = "";        
          
          
        }
        /*-------------------------------*/

      }
      else if(this.endTimestamp-this.startTimestamp>20736000 && this.endTimestamp-this.startTimestamp<=41472000){
        
        /*-------------------------------*/
        for(var i=0;i<data.length;i++){
          for(var j=0;j<data[i].length;j+=96){
            
            this.water_data_container.push(data[i][j]['liters']);    
            
            var t = new Date(data[i][j]['timestamp']*1000);
            //console.log(t.toISOString())
            this.timestamp_data_container.push(t.toISOString().substring(11,13));
            
            
            //this.timestamp_data_container.push(data[i][j]['timestamp']);
  
            this.user_apart_id = data[i][j]['appartmentId'];
            console.log('user :',this.user_apart_id);    
          }
          //console.log('user: ',this.user_apart_id);
          this.object_final = {'data':this.water_data_container,'label':this.final_user_identity_list[i][this.user_apart_id]}
          this.total_data.push(this.object_final);
          this.color = { // grey
            backgroundColor: 'rgba('+this.randomColor(i*2)+','+this.randomColor(i*2)+',177,0.4)',
            borderColor: 'rgba('+this.randomColor(i)+',159,'+this.randomColor(i)+',0.5)',
            pointBackgroundColor: 'rgba('+this.randomColor(i)+',159,177,0.6)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,'+this.randomColor(i)+',177,0.8)'
          }
          this.color_array.push(this.color)
          
          this.label_container.push(this.timestamp_data_container)
          this.temp_water_container[i] = this.water_data_container;
          console.log(this.temp_water_container)
          
          this.water_data_container = [];
          this.timestamp_data_container = [];
          this.user_apart_id = "";        
          
          
        }
        /*-------------------------------*/

      }
      else if(this.endTimestamp-this.startTimestamp>41472000 && this.endTimestamp-this.startTimestamp<=82944000){
        
        /*-------------------------------*/
        for(var i=0;i<data.length;i++){
          for(var j=0;j<data[i].length;j+=120){
            
            this.water_data_container.push(data[i][j]['liters']);    
            
            var t = new Date(data[i][j]['timestamp']*1000);
            //console.log(t.toISOString())
            this.timestamp_data_container.push(t.toISOString().substring(11,13));
            
            
            //this.timestamp_data_container.push(data[i][j]['timestamp']);
  
            this.user_apart_id = data[i][j]['appartmentId'];
            console.log('user :',this.user_apart_id);    
          }
          //console.log('user: ',this.user_apart_id);
          this.object_final = {'data':this.water_data_container,'label':this.final_user_identity_list[i][this.user_apart_id]}
          this.total_data.push(this.object_final);
          this.color = { // grey
            backgroundColor: 'rgba('+this.randomColor(i*2)+','+this.randomColor(i*2)+',177,0.4)',
            borderColor: 'rgba('+this.randomColor(i)+',159,'+this.randomColor(i)+',0.5)',
            pointBackgroundColor: 'rgba('+this.randomColor(i)+',159,177,0.6)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,'+this.randomColor(i)+',177,0.8)'
          }
          this.color_array.push(this.color)
          
          this.label_container.push(this.timestamp_data_container)
          this.temp_water_container[i] = this.water_data_container;
          console.log(this.temp_water_container)
          
          this.water_data_container = [];
          this.timestamp_data_container = [];
          this.user_apart_id = "";        
          
          
        }
        /*-------------------------------*/

      }
      else if(this.endTimestamp-this.startTimestamp>82944000 && this.endTimestamp-this.startTimestamp<=134784000){
        
        /*-------------------------------*/
        for(var i=0;i<data.length;i++){
          for(var j=0;j<data[i].length;j+=144){
            
            this.water_data_container.push(data[i][j]['liters']);    
            
            var t = new Date(data[i][j]['timestamp']*1000);
            //console.log(t.toISOString())
            this.timestamp_data_container.push(t.toISOString().substring(11,13));
            
            
            //this.timestamp_data_container.push(data[i][j]['timestamp']);
  
            this.user_apart_id = data[i][j]['appartmentId'];
            console.log('user :',this.user_apart_id);    
          }
          //console.log('user: ',this.user_apart_id);
          this.object_final = {'data':this.water_data_container,'label':this.final_user_identity_list[i][this.user_apart_id]}
          this.total_data.push(this.object_final);
          this.color = { // grey
            backgroundColor: 'rgba('+this.randomColor(i*2)+','+this.randomColor(i*2)+',177,0.4)',
            borderColor: 'rgba('+this.randomColor(i)+',159,'+this.randomColor(i)+',1)',
            pointBackgroundColor: 'rgba('+this.randomColor(i)+',159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,'+this.randomColor(i)+',177,1)'
          }
          this.color_array.push(this.color)
          
          this.label_container.push(this.timestamp_data_container)
          this.temp_water_container[i] = this.water_data_container;
          console.log(this.temp_water_container)
          
          this.water_data_container = [];
          this.timestamp_data_container = [];
          this.user_apart_id = "";        
          
          
        }
        /*-------------------------------*/

      }


      for(var i = 0;i<this.total_data.length;i++){
        var a = this.total_data[i]['label'];
        var b = this.cal(this.total_data[i]['data'])
        this.test_array.push(String(a)+' : '+String(b));
      }
      
      var t1 = new Date(this.startTimestamp*1000)
      this.date_start = t1.getDate()+'-'+(t1.getMonth()+1)+'-'+t1.getFullYear()
      var t2 = new Date(this.endTimestamp*1000)
      this.date_end = t2.getDate()+'-'+(t2.getMonth()+1)+'-'+t2.getFullYear()
      
      this.waterlineData=this.total_data;
    
      
      for(var i=0;i<this.label_container.length-1;i++){
       
        if(this.label_container[i].length>this.label_container[i+1].length){
          this.max_label = this.label_container[i]    
        }
        else{
          this.max_label = this.label_container[i+1]
        }
    }
      //console.log('max_label: ',this.max_label)
      this.lineChartColors = this.color_array;
      this.waterLabels= this.max_label;
      this.lineChartOptions= {
        responsive: true
      };

      this.lineChartLegend= true;
      this.lineChartType= 'line';
      
      /*
      console.log(this.final_data_list)
      this.user_water_data = [];
      this.user_water_data = data['tank']
      this.waterlineData = [];
      this.waterLabels = [];
      this.hour = [];
      this.datetimeConverter(data['tank'])
      */    

      //console.log(this.user_water_data);
    
      //console.log(data)
      
      /*
      for(i=0;i<this.user_water_data.length;i++ ){
        //this.user_time[i] = String(this.user_water_data[i]['datetime']);
        this.user_water[i]=parseInt(this.user_water_data[i]['liters']);
      }
      */     
      console.log('s',this.test_array);
    });
    
    setInterval(()=>{
      this.getUserData();
    },300000);
    
  };

  getUserName(){
    this.authService.getAllUsername().subscribe(data=>{
      this.user_name_list = data['user_data'];
      for(var i=0;i<this.user_name_list.length;i++){
        this.user_identity[this.user_name_list['appartmentId']] = this.user_name_list['name']
        this.final_user_identity_list = this.user_identity;
      }
    })
  }
  checkBox(appartmentID,e){
    if(e.target.checked){
      this.selectAppartmentId.push(appartmentID);
    }
    else{
      var index = this.selectAppartmentId.indexOf(appartmentID);
      this.selectAppartmentId.splice(index,1);

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

datetimeConverter(timestampArray){
  for(var i =0;i<timestampArray.length;i++){
    var t = new Date(timestampArray[i]['timestamp']*1000)
    this.date = t.getDate()+'-'+t.getMonth()+'-'+t.getFullYear()
    this.hour.push(t.toISOString().substring(11,13))
  }

  
}
finalobjectmaker(){
  this.finalObj = {'appartmentId':this.selectAppartmentId,'starttimestamp':this.startTimestamp,'endtimestamp':this.endTimestamp}
  //console.log(this.finalObj)
  this.getUserData();  
  
}
randomColor(i){
  console.log('s',Math.round(((Math.random()+i*25) * 2)))
  return Math.round(((Math.random()+i*25) * 2))
}
cal(x){
  var sum = 0;
  for(var i = 0;i<x.length;i++){
    sum+=x[i]
  }
  return sum;
}

}
