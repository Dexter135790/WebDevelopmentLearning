const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var items = ["Green", "Blue"];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.render("list",{
        listItem: items
    })
})

app.post("/",(req, res)=>{
    var item = req.body.inputText;
    items.push(item);
    res.redirect("/");

})


app.listen(3000, ()=>{
    console.log("Server started on port 3000.");
})