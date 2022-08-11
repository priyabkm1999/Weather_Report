var express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine','ejs')
app.use(express.static(__dirname + '/Public'));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    const url = "https://api.openweathermap.org/data/2.5/forecast?q=london&appid=e594c712fc478149c37e1e622f5a173f&units=metric";
    
    https.get(url , function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            var temp = weatherData.list[0].main.temp;
            var weatherdescription = weatherData.list[0].weather[0].description;
            var cityname = weatherData.city.name;
            var icon = weatherData.list[0].weather[0].icon;
            var windspeed = weatherData.list[2].wind.speed;
            var humidity = weatherData.list[2].main.humidity;
            var visibility= weatherData.list[2].visibility;
            res.setHeader("Content-Type", "text/html");
            var imageURL =  "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
            // res.render('index',{temp:temp,weatherdescription:weatherdescription,imageURL:imageURL, cityname:cityname});
            var temparature = [];
            var ImageURL = [];
            for(var i=1; i<8 ; i++){
                 temparature[i] = weatherData.list[i].main.temp;
                 ImageURL[i] ="http://openweathermap.org/img/wn/"+  weatherData.list[i].weather[0].icon+"@2x.png";
                res.locals.temparature=temparature;
                res.locals.ImageURL=ImageURL;
            }
            res.locals.temp=temp;
            res.locals.weatherdescription=weatherdescription;
            res.locals.cityname= cityname;
            res.locals.imageURL= imageURL;
            res.locals.windspeed=windspeed;
            res.locals.humidity=humidity;
            res.locals.visibility=visibility;
            res.render('index');
        });
    });
})
// list[17].weather[0].icon
// https://api.openweathermap.org/data/2.5/forecast?q=India&appid=e594c712fc478149c37e1e622f5a173f&units=metric
app.post("/", function(req, res){
    var query1 = req.body.cityName;
    //console.log(query1);
    const url = "https://api.openweathermap.org/data/2.5/forecast?q="+query1+"&appid=e594c712fc478149c37e1e622f5a173f&units=metric";
    let result = '';
     https.get(url , function(response){
    response.on("data", (data) =>{
        result += data;
    });
    response.on('end', () => {
   
        // console.log(response.statusCode);
        // console.log("++++++Delhi");
        // console.log(response);
        // response.on("data", function(data){
            const weatherData = JSON.parse(result);
            const temp = weatherData.list[0].main.temp;
            var weatherdescription = weatherData.list[0].weather[0].description;
            const icon = weatherData.list[18].weather[0].icon;
            var cityname = weatherData.city.name;
            var windspeed = weatherData.list[2].wind.speed;
            var humidity = weatherData.list[2].main.humidity;
            var visibility = weatherData.list[2].visibility;
            const imageURL =  "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
            // res.render('index',{temp:temp,weatherdescription:weatherdescription,imageURL:imageURL,cityname:cityname});
            var temparature = [];
            var ImageURL = [];
            for(var i=1; i<8 ; i++){
                 temparature[i] = weatherData.list[i].main.temp;
                 ImageURL[i] ="http://openweathermap.org/img/wn/"+  weatherData.list[i].weather[0].icon+"@2x.png";
                res.locals.temparature=temparature;
                res.locals.ImageURL=ImageURL;
            }
            res.locals.temp=temp;
            res.locals.weatherdescription=weatherdescription;
            res.locals.cityname= cityname;
            res.locals.imageURL= imageURL;
            res.locals.windspeed=windspeed;
            res.locals.humidity=humidity;
            res.locals.visibility=visibility;
            res.render('index');
        })
    });
})

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})
















 // var weatherdescription = weatherData.weather[0].description;
    
 // const query = req.body.cityName;
     
    // res.sendFile(__dirname + "/views/index.html");
 // console.log(response.statusCode);

 //var cityname = weatherData.name;
         // var icon = weatherData.weather[0].icon;
          
  // res.write("<p>The writer is currently "+ weatherdescription+"<p>");
            // res.write("<h1>The temperature is " + temp + " degrees Celcius.</h1>");
            //  res.write("<img src=" + imageURL + ">");
            // res.send();
          

  // const weatherdescription = weatherData.weather[0].description;
         
            //const icon = weatherData.weather[0].icon;
            //var cityname = weatherData.name;
           
 // res.write("<p>The writer is currently "+ weatherdescription+"<p>");
            // res.write("<h1>The temperature is " + temp + " degrees Celcius.</h1>");
            //  res.write("<img src=" + imageURL + ">");
            // res.send();

    // console.log(req.body.cityName);
    
  






/*
app.post("/", function(res, req){
    console.log(req.body.cityName);
})
const query = "London";
    const apikey = "b5048bee760946a438aff7a86b5d7723";
    const unit = "Metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit

    https.get(url , function(response){
        console.log(response.statusCode);


        response.on("data", function(data){
            const weatherData = JSON.parse(data)
           //console.log(weatherData);
           // const object = {
            //    name: "Priyanka",
             //   color : "Purple"
            }
           // console.log(JSON.stringify(object));
            const temp = weatherData.main.temp
            const weatherdescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL =  "http://openweathermap.org/img/wn/"+ icon + "@2x.png"
            res.write("<p>The writer is currently "+ weatherdescription+"<p>");
            res.write("<h1>The temperature in Jharkhand is " + temp + " degrees Celcius.</h1>");
             res.write("<img src=" + imageURL + ">");
            res.send()
            //console.log(weatherdescription);

           // console.log(temp);
        })
    })
    */
        