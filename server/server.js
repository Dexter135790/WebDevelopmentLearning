  const express = require("express");

  const app = express();

  app.get("/", function(request, response){
    // console.log(request);
    response.send("<h1>Hello world</h1>");
  })

  app.get("/contact", function(req, res){
    res.send("My contact number");
  })

  app.get("/about", function(req, res){
    res.send("My name is DKB");
  })

  app.get("/hobbie", function(req, res){
    res.send("<p>get the hell out of here </p>"); 
  })

  app.listen(3000, function(){
    console.log("Server is running on the port 3000");
  });