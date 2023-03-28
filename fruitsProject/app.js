const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });

const fruitSchema = new mongoose.Schema(
{
    name: String,
    rating: Number,
    review: String9
}
)



const insertDocuments = function(db, callback) {
    //Get the documents collection
    const collection = db.collection('fruits');
    //Insert some documents
    collection.insertMany([
        {
            name: "Apple",
            score: 8,
            reciew: "Great fruit"
        },
        {
            name: "Orange",
            score: 6,
            reciew: "Kinda sour"
        },
        {
            name: "Banana",
            score: 9,
            reciew: "Great stuff!"
        }
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Insert 3 documents into the collection");
        callback(result);
    })
}