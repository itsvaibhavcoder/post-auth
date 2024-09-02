const mongoose = require("mongoose")

const {UserModel} = require("../models/UserModel")

async function emailValidator(req, res, next){
    if(req.path =="/user/register"){
        let data = await UserModel.find({email: req.body.email})

        if(data.length>0){
            res.send({
                message: "User already exist"
            })
        }
        else{
            next()
        }
    }
    else{
        next()
    }
}

module.exports = {emailValidator}