const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const async = require('async');
var userApartmentId = ""
//Register
router.post('/register',(req,res)=>{
    let newUser = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        appartmentId:req.body.apartmentId
    }

    User.addUser(newUser,(err,result)=>{
        if(err){
            res.json({success:false,msg:"Failed to register user"})
            console.log(err)
        }
        else{
            res.json({success:true,msg:"User registered"})
            console.log(newUser)
        
        }
    })

})

//Authenticate
router.post('/authenticate',(req,res)=>{
    
    const name = req.body.name;
    const password = req.body.password;
    //const apartmentId = req.body.apartmentId;
    
    
    User.getUserByUsername(name,(err,user)=>{
        if(err){
            console.log(err)
        }
        if(user[0] == undefined){
            return res.json({success:false,msg:'user not found'});
        }
        else{
            
            User.comparePassword(password,user[0].password,(err,isMatch)=>{
                if(err){
                    console.log(err)
                }
                if(isMatch){

                    userApartmentId = user[0].appartmentId; 

                    user_data = {
                        id:user[0].id,
                        name:user[0].name,
                        email:user[0].email,
                    }
                    
                    const token = jwt.sign(user_data,config.secret,{ expiresIn: '5m' });
                    res.json({
                        success:true,
                        token:'JWT '+token,
                        user:{
                            id:user[0].id,
                            name:user[0].name,
                            email:user[0].email,
                            appartmentId:user[0].appartmentId,
                            type:'user'
                        }
                    })
                }
                else{
                    res.json({success:false,msg:'Wrong Password'})
                }
            });
        }
    })
  
})

//Authenticate Admin
router.post('/authenticateAdmin',(req,res)=>{
    
    const name = req.body.name;
    const password = req.body.password;
    User.getAdminByname(name,(err,user)=>{
        if(err){
            console.log(err)
        }
        if(user[0] == undefined){
            return res.json({success:false,msg:'user not found'});
        }
        else if(user[0].password == password){
            user_data = {
                id:user[0].id,
                name:user[0].name,
            }
            const token = jwt.sign(user_data,config.secret,{ expiresIn: '10h' });
            res.json({
                success:true,
                token:'JWT '+token,
                user:{
                    name:user[0].name,
                    type:'admin'
                }
            })
    
            
        }
    })
  
})

// Tank
router.get('/tank', passport.authenticate('jwt', {session:false}),(req, res, next) => {
    startTimestamp = parseInt(req.query.timestamp);
    endTimestamp = startTimestamp+86400;
    var final_data  = [];
    User.gettankData(startTimestamp,endTimestamp,(err,data)=>{
        
        if(err){
            console.log(err);
        }
        else{
            //console.log(data)
            res.json({tank:data})  
            //
        }
    });

});

router.get('/currenttank', passport.authenticate('jwt', {session:false}),(req, res, next) => {
    startTimestamp = parseInt(req.query.timestamp);
    User.currenttankData(startTimestamp,(err,data)=>{
        
        if(err){
            console.log(err);
        }
        else{
            //console.log(data)
            res.json({tank:data})  
            //
        }
    });

});
  
  router.get('/userwater',passport.authenticate('jwt', {session:false}), (req, res, next) => {
    startTimestamp = parseInt(req.query.starttimestamp);
    endTimestamp = parseInt(req.query.endtimestamp);
    appartmentId = req.query.appartmentIds;
    
    console.log("test_0",startTimestamp,endTimestamp,userApartmentId);

    User.getuserwaterData(appartmentId,startTimestamp,endTimestamp,(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json({tank:data})
        }
    });
  }); 

  router.get('/getUserWaterByAdmin',passport.authenticate('jwt', {session:false}), (req, res, next) => {
    startTimestamp = parseInt(req.query.starttimestamp);
    endTimestamp = parseInt(req.query.endtimestamp);
    appartmentIds = (req.query.appartmentIds).split(',');
    
    
    User.getuserwaterDataforAdmin(appartmentIds,startTimestamp,endTimestamp,(err,data)=>{
    
        res.json(data);
        
    })
    /*
    async.series([User.getuserwaterDataforAdmin(appartmentIds,startTimestamp,endTimestamp,(err,data)=>{
        console.log(data)
    })
    ],function(err,result){
        console.log('data: ',result);
    });
    */
    
});

  



// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
  });

// Profile
router.get('/usermanagers', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
  });



router.get('/userAll',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    User.getAllusername((err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json({user_data:data})
        }
    });
})

router.get('/userAlldetails',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    User.getAlluserdetails((err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json({user_data:data})
        }
    });
})

router.put('/updateUser',passport.authenticate('jwt',{session:false}),(req,res)=>{
    
    var user_object = req.body
    
    User.updateUser(user_object,(err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json({user_data:data,msg:'success'})
        }        
    })
     
})
router.post('/deleteUser',passport.authenticate('jwt',{session:false}),(req,res)=>{
    
    var user_object = req.body.id;
    
    User.deleteUser(user_object,(err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json({user_data,msg:'success'})
        }        
    })
     
})



module.exports = router