const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended : true }))

//To use the public forlder for the other resources 
app.use(express.static("public"));

mongoose.connect('mongodb://localhost/toDoListDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

const itemsSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to to do list!"
});

const item2 = new Item({
    name: "Hit the + button to add a new Item"
});

const item3 = new Item({
    name: "<- Hit this to delete an item"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", (req, res)=>{
    
    Item.find()
    .then((foundItems)=>{
        if(foundItems.length === 0){
            Item.insertMany(defaultItems)
            .then(()=>{
            console.log("Successfully inserted!");
            })
            .catch((err)=>{
            console.log(err);
            });
            res.redirect("/");
        }else{
            res.render("list", {
                listTitle: "Today",
                newListItems: foundItems
            });
        }
        
    })
    .catch((err)=>{
        console.log(err);
    });
    // Render the variables in the ejs code 
    
});

app.post("/", (req, res)=>{

    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
        name: itemName
    });

    if(listName === "Today"){
        item.save();
        res.redirect("/");
    }else{
        List.findOne({name: listName})
        .then((foundList)=>{
            foundList.items.push(item);
            foundList.save();
            res.redirect("/"+listName);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
});

app.post("/delete", (req, res)=>{
    checkedItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemId)
    .then(()=>{
        console.log("Successfully removed!");
    })
    .catch((err)=>{
        console.log(err);
    }); 
    res.redirect("/");
})


app.get("/:customListName", (req, res)=>{
    const customListName = req.params.customListName;

    List.findOne({name: customListName})
    .then((foundList)=>{
        if(!foundList){
            const list = new List({
                name: customListName,
                items: defaultItems
            });
        
            list.save(); 
            res.redirect("/"+customListName);
        }else{
            res.render("list", {
                listTitle: foundList.name,
                newListItems: foundList.items
            });
        }
    })
    .catch((err)=>{
        console.log(err);
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