const express = require("express");
const https = require("https");


const app = express();

app.get("/", function(req, res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=London&APPID=6992939445b12a17011662a55d8d0424&units=metric";

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const object = {
                name: "Dhiraj",
                hobbie: "k"
            }
            console.log(JSON.stringify(object));
            const temp = weatherData.main.temp;
            console.log(temp);
            const description = weatherData.weather[0].description;
            console.log(description);
            const icon = weatherData.weather[0].icon;
            const imageUrl = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
            res.write("<h1>The temperature in London is "+ temp + " degree celcius</h1>");
            res.write("<p> The weather is currently "+ description+"</p>");
            res.write("<img src="+ imageUrl +">");
            res.send(); 
        })

    })
})



app.listen(3000, function(){
    console.log("Server is running on port 3000");
})