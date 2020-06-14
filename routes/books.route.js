const express = require("express");
var shortid = require("shortid");
var db = require('../db');

var router = express.Router();


router.get("/", function(req, res) {
    res.render("./index", {
      books: db.get("books").value()
    });
  });
  router.get("/create", function(req, res) {
    res.render("./create");
  });
  router.post("/create", function(req, res) {
    req.body.id = shortid.generate();
    db.get("books")
      .push(req.body)
      .write();
    res.redirect("/books");
  });
  router.get("/:id/update",function(req,res){
    var id = req.params.id;
    var book = db.get("books").find({id: id}).value();
    res.render("./update",{book: book});
    // router.post("/update",function(req,res){
    //   var x = req.body.title;
    //   book.title = x;
    //   db.get('books').write();
    //   res.redirect("");
    // });   
  });
  router.post("/update",function(req,res){
      var id = req.body.id;
      db.get("books").find({id: id})
      .assign({ title: req.body.title})
      .write();
      res.redirect("/books");
    });  
  router.get('/:id/delete',function(req,res){
    var id = req.params.id;
    console.log(id);
    var book = db.get('books')
    .find({ id: id })
    .value()
    var delBook = db.value().books.map(function(x,index){
        if(x===book){
            db.value().books.splice(index,1);
            db.get('books').write()
        }
    });
    res.render('./delete',{
        book: book
    })
  });

module.exports = router;