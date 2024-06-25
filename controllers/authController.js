const userModel = require("../models/user-model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generatetoken }= require("../utils/generatetoken");

const registerUser = async function (req, res) {
    try {
        let { email, password, fullname } = req.body;

        let user = await userModel.findOne({email: email});
        if(user) {
            req.flash("error", "You already have an account, please login.")
            return res.redirect("/");
        }

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err)  return res.send(err.message);
                else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname,
                    });
                    let token = generatetoken(user);
                    res.cookie("token", token);
                    res.redirect("/shop");
                }
            });
        });
    } catch (err) {
        res.send(err.message);
    }
};

const loginUser = async function(req, res){
    let {email, password} = req.body;

    let user = await userModel.findOne({ email: email});
    if(!user) {
        req.flash("error", "Email or Password incorrect");
        return res.redirect("/");
    }
    
    bcrypt.compare(password, user.password, function(err, result){
        if(result){
            let token = generatetoken(user);
            res.cookie("token", token);
            res.redirect("/shop");
        }
        else{
            req.flash("error", "Email or Password incorrect");
            return res.redirect("/");
        }
    })
};

const logout = async function(req, res){
    res.cookie("token", "")
    res.redirect("/");
};

module.exports = { registerUser, loginUser, logout }