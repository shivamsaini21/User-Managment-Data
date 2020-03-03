// var config = require('../config/config.json');
var db_user = require('../models/user');
var bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken')
//recieving login request
exports.login = (req,res)=>{
    console.log(req.body);
    //recieving body
    var jsonParse = JSON.parse(req.body);
    const email = jsonParse.email;
    const password = jsonParse.password;
                //finding email
                db_user.findOne({email:email}).exec()
                .then(result => {
                    var user_id=result._id;
                    //execute when result is not found
                    if(!result)
                        res.send("Invalid Credentials.!");
                        //execute when result is found
                        if(result){
                            //executes when email is not found user db
                        if(result.email != email)
                        {
                            console.log("User not found!");
                        }
                        //comparing password by bcryptjs algo
                        bcrypt.compare(password,result.password,(err,isMatch) =>{
                            //executes when password is not matched
                            if(err) throw err;
                            //executes when password is valid
                            if(isMatch){
                                //token generation
                            // var token = jwt.sign({id:user_id,email:email,password:password}, config.key,{expiresIn: 60 * 60});
                            res.json({
                                success :true,
                                message : 'login successfully.'
                                // token : token
                            });
                            }
                            //executes when password does'nt match
                            else
                            res.json({
                                success: false,
                                message:'Password Mismatch'
                            });
                        });    
                    }
                })
                .catch(err => {
                    console.log(err);
                    return;
                })
}