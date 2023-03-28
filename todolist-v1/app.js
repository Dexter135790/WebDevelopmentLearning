const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");


const app = express();
let items = ["Buy food", "Cook food", "Eat food"];
let workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended : true }))

//To use the public forlder for the other resources 
app.use(express.static("public"));

app.get("/", (req, res)=>{
    
    let day = date.getDay();
    // Render the variables in the ejs code 
    res.render("list", {
        listTitle: day,
        newListItems: items
    });
});

app.post("/", (req, res)=>{

    let item = req.body.newItem;

    if(req.body.list === "Work"){ 
        workItems.push(item);
        res.redirect("/work");
    }else{
    items.push(item);
    res.redirect("/");
    }

});

app.get("/work", (req, res)=>{
    res.render("list",{
        listTitle: "Work List",
        newListItems: workItems
    });
});

app.post("/work", (req, res)=>{
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/about", (req, res)=>{
    res.render("about");
});

// listen on port 3000 
app.listen(3000, ()=>{
    console.log("Server started on port 3000");
})