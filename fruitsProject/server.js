const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fruitsDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));


  const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Please check the data entry, no name specified"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
  });

  
  const Fruit = mongoose.model("Fruit", fruitSchema);

  const fruit = new Fruit({
    name: "KKK",
    rating: 10,
    review: "Pretty solid as a fruit." 
  });

//   fruit.save(); 

const peopleSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

const People = mongoose.model("People", peopleSchema);

const grapes = new Fruit({
    name: "Grapes",
    rating: 9,
    review: "Great Fruit for me"
});

grapes.save();

 // const people = new People({
//     name: "Amy",
//     age: 12,
//     favouriteFruit: pineapple
// });

// people.save();

// const kiwi = new Fruit({
//     name: "kiwi",
//     rating: 10,
//     review: "The best fruit!"
// }); 

// const orange = new Fruit({
//     name: "Orange",
//     rating: 4,
//     review: "Too sour for me!"
// });

// const banana = new Fruit({
//     name: "Banana",
//     rating: 3,
//     review: "Weird Texture!"
// });

// Fruit.insertMany([kiwi, orange, banana]);

// Fruit.find()
// .then(function (fruits) {
// //   console.log(fruits[0].name);
//     fruits.forEach( (fruit)=> {
//         console.log(fruit.name);
//     });

//     mongoose.connection.close();
// })
// .catch(function (err) {
//   console.log(err);
// });

People.updateOne({name: "John"}, {favouriteFruit: grapes})
.then(() =>{
    console.log("Successfully updated the record");
    mongoose.connection.close();
})
.catch((err)=>{
    console.log(err);
});

// Fruit.deleteOne({name: "KKK"})
// .then( ()=>{
//     console.log("Successfully deleted the record");
// })
// .catch((err)=>{
//     console.log(err);
// });


// People.deleteMany({name: "John"})
// .then( ()=>{
//     console.log("Successfully deleted the record");
// })
// .catch((err)=>{
//     console.log(err);
// });

  
  