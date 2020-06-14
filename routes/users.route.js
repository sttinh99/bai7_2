const express = require("express");
var shortid = require("shortid");
var db = require('../db');

var router = express.Router();


router.get("/", function(req, res) {
    res.render("./indexUser", {
      users: db.get("users").value()
    });
  });
  router.get("/create", function(req, res) {
    res.render("./createUser");
  });
  router.post("/create", function(req, res) {
    req.body.id = shortid.generate();
    db.get("users")
      .push(req.body)
      .write();
    res.redirect("/users");
  });
  router.get("/:id/update",function(req,res){
    var id = req.params.id;
    var user = db.get("users").find({id: id}).value();
    res.render("./updateUser",{user: user});
    // router.post("/update",function(req,res){
    //   var x = req.body.title;
    //   book.title = x;
    //   db.get('users').write();
    //   res.redirect("");
    // });   
  });
  router.post("/update",function(req,res){
      var id = req.body.id;
      db.get("users").find({id: id})
      .assign({ name: req.body.name})
      .write();
      res.redirect("/users");
    });  
  router.get('/:id/delete',function(req,res){
    var id = req.params.id;
    console.log(id);
    var user = db.get('users')
    .find({ id: id })
    .value()
    var delUser = db.value().users.map(function(x,index){
        if(x===user){
            db.value().users.splice(index,1);
            db.get('users').write()
        }
    });
    res.render('./deleteUser',{
        user: user
    })
  });

module.exports = router;