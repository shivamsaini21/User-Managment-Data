// var config = require('../config/config.json');
var db_user = require('../models/user');
var bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken');
// User insertion
exports.register = (req,res)=>{
    //recieving body
    var content = JSON.parse(req.body);
    console.log(content);
    var email = content.email;
    var firstname = content.firstname;
    var lastname = content.lastname;
    var password = content.password;
    // console.log(email);
    try{
db_user.findOne({email:content.email}).exec().then(result => {
    if (result) {
        console.log(result);
        if (result.email === email) {
            res.send('user is already registered');
        }
    }
    else{
        var obj = new db_user({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: bcrypt.hashSync(password,10)
        })
        //saving details of user in user collection
        obj.save((err,data)=>{
            if(!err){
                res.json({
                success:true,
                message: 'User registered successfully',
                data :{
                firstname: obj.firstname,
                lastname: obj.lastname,
                email: obj.email
                }
                })
            }
            else{res.status(404).send('invalid data formate')
        }
        });
    }
})
    }catch(err){   
        console.log(err);
    }
    //calling user schema for value insertion
    
}
 
exports.get_user = (req,res)=>{
    console.log('ok');
    // var user_id = req.params.user_id;
    try{
        db_user.find({},function(req,result){
            console.log(result);
            res.send(result)
        })
        }catch(err){
            console.log(err);
        }
}
//deleting user details from user db
exports.delete_user = (req,res)=>{
    var user_id = req.params.id;
    db_user.deleteOne({_id: user_id},function (err, data) {
           if (data.deletedCount === 0) {
        res.send("user does not exist");
    } else {
       res.send("user deleted");
    }
});
}
// //updating user details from user db
// exports.update_user = (req,res)=>{
//     var user_id = req.params.user_id;
//     var content = JSON.parse(req.body.toString())
//     db_user.findOneAndUpdate({_id: user_id},content,{new: true},function (err, data) {
//            if (data === null || typeof data === 'undefined') {
//         res.send("user does not exist");
//     } else {
//        res.send("user updated");
//     }
//       });
//    }