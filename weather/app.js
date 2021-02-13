const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

    const apiKey = "a5fee4b25f1ac4ca06cbc628b8d0d409";
    const cityName = req.body.cityName;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units="+ unit +"&appid="+ apiKey;
    https.get(url, function(resp){
      console.log(resp.Statuscode);

      resp.on("data", function(data){
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        const weatherDesc = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
        res.write("<p>weather is currently " + weatherDesc + "</p>");
        res.write("<h1>The temprature in "+ cityName +" is " + temp + " Degree Celcius</h1>");
        res.write("<img src=" + imageURL + ">");
        res.send()
      })
    })

})


app.listen(3000, function(){
  console.log("Server is running on port 3000");
})
