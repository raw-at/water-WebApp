const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const async = require('async');

var connection = mysql.createConnection({
    
        host:config.host,
        user:config.user,
        password:config.password,
        database:config.database,
    
    }) 


module.exports.getUserById = function(id,callback){

    connection.query('SELECT * FROM `users` WHERE `id` = ?',[id],callback);    
    
}
module.exports.getUserByUsername = function(name,callback){
    connection.query('SELECT * FROM `users` WHERE `name` = ?',[name],callback);    
    
}
module.exports.getAdminByname = function(name,callback){

    connection.query('SELECT * FROM `admin` WHERE `name` = ?',[name],callback);    
    
}
module.exports.gettankData = function(startTimestamp,endTimestamp,callback){

    connection.query('SELECT * FROM tank where `timestamp` between ? and ? ',[startTimestamp,endTimestamp],callback);    
    
}

module.exports.getuserwaterData = function(apartmentId,startTimestamp,endTimestamp,callback){
    console.log("test",apartmentId,startTimestamp,endTimestamp)
    connection.query('SELECT * FROM water WHERE appartmentId = ? and `timestamp` between ? and ?',[apartmentId,startTimestamp,endTimestamp],callback);    
    
}

module.exports.currenttankData = function(startTimestamp,callback){
    
        connection.query('SELECT * FROM tank where `timestamp` = ? ',[startTimestamp],callback);    
        
}

module.exports.getuserwaterDataforAdmin = function(apartmentIds,startTimestamp,endTimestamp,callback){   
    var final_data_holder = [];
    
    async.each(apartmentIds,function(id,callback){
        var q = 'SELECT * FROM water WHERE appartmentId = '+id+' and timestamp between '+startTimestamp+' and '+endTimestamp
        
        connection.query(q,(err,data)=>{
            if(err){
                callback(err);
                return;
            }
            else{
                final_data_holder.push(data);
                callback();
            }
        });   

    },(err)=>{
        if(err){
                console.log(err)
        }
        else{
            callback(null,final_data_holder)
        }
    });


        
}

module.exports.getAllusername = function(callback){
    connection.query('SELECT name,appartmentId FROM users',callback);
}

module.exports.getAlluserdetails = function(callback){
    connection.query('SELECT name,email,appartmentId FROM users',callback);
}

module.exports.updateUser = function(user_object,callback){
    connection.query('UPDATE users Set name = ?,email = ?,appartmentId = ? where appartmentId = ?',[user_object['name'],user_object['email'],user_object['appartmentId'],user_object['appartmentId']],callback);
}
module.exports.deleteUser = function(id,callback){
    connection.query('DELETE FROM users where appartmentId = ?',[id],callback);
}
module.exports.addUser = function(newUser,callback){
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            console.log(err)
        }
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            newUser.password = hash;

            connection.query('INSERT INTO users SET ?',newUser,callback);
        })
    })

}

module.exports.comparePassword = function(userPass,hash,callback){
    
    bcrypt.compare(userPass,hash,(err,isMatch)=>{
        if(err){
            console.log(err)
        }
        else{
            callback(null,isMatch)
        }
    })

}