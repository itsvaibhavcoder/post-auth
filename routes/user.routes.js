const express = require("express");
const { UserModel } = require("../models/UserModel");
var jwt = require('jsonwebtoken');
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    try {
        let user = new UserModel(req.body);
        await user.save();
        res.send({
            message: "User registered successfully"
        });
    } 
    catch (error) {
        res.send({
            message: error.message
        });
    }
});

userRouter.post("/login", async (req, res) => {
    const option = {
        expiresIn: "10"
    }
    var token = jwt.sign(req.body, "vaibhav@123", option);
    try {
     let data = await UserModel.find(req.body)
     if(data.length>0){
        res.send({
            message: "User logged in successfully",
            details : data[0],
            token: token
        })
     } 
     else{
        res.send({
            message: "No such user is found"
        })
      }
    } 
    catch (error) {
        res.send({
            message: error.message
        })
    }
});

userRouter.post("/post", (req, res)=>{
    let token = req.headers.authorization
    try{
      if(err){
          res.send({
            message: err.message
          })
          return
      }
      jwt.verify(token, "vaibhav@123", function(err, decoded){
        if(decoded){
            res.send({
                message: "All the data"
            })
        }
        else{
            res.send({
                message: "Invalid token"
            })
        }
      })
    }
    catch(error){
       res.send({
        message: error.message
       })
    }
})
userRouter.delete('/:id', async(req, res)=>{
    const {id} = req.params
    try{
    await UserModel.findByIdAndDelete({_id: id})
    res.send({
        message: "User deleted"
    })
}
    catch(error){
        res.send({
            message: error.message
        })
    }
})

module.exports = { userRouter };
