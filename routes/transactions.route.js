const express = require("express");
var shortid = require("shortid");
var db = require('../db');
var router = express.Router();
router.get("/",function (req,res){
    
    var arrUser = [];
    var objTrans = {};
    var userTrans=db.get("trans").value();
    var takeUser = userTrans.map(function(item){
        return{
            user : db.get("users").find({id: item.idUser}).value().name,
            book : db.get("books").find({id: item.idBook}).value().title
        }
    });
    res.render("./transactions/index", {
        trans:takeUser
    });
});
router.get("/create",function (req,res) {
    var books = db.get("books").value();
    var users = db.get("users").value();
    res.render("./transactions/create",{books: books,users: users});
});
router.post("/create",function (req,res) {
    req.body.id = shortid.generate();
    db.get("trans").push(req.body).write();
    res.redirect("/transactions");
})
module.exports = router;