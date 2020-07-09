const express = require("express");
const bodyParser = require("body-parser");
const https= require("https");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
  res.sendFile( __dirname+ "/index.html");
});
 app.post("/",function(req,res){
  const query = req.body.cityName;
  const apiId = "6a58f49b832e5dce5c6e173488b8f014";
  const url= "https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+ apiId+"&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon= weatherData.weather[0].icon
      imageUrl=("http://openweathermap.org/img/wn/"+ icon +"@2x.png");
      console.log(description);

      res.write("<p> The Weather is currently  "  +  description  + "</p>");
      res.write(" <h1>The temperature in "+ query +" is " + temp + " degree Celcius..</h1>");
      res.write("<img src="+imageUrl +">");
      res.send();
    });
   });




 });







app.listen(3000, function() {
  console.log("Server is started at port 3000.");
});
