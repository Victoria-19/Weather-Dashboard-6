var cityList =$("#list"); 
var cities = [];
var key = "daa2a08da6f24590f5f16001b2834d99"; // My api key
// this function formats the day at the top
function FormatDay(date){
    var date = new Date();
    console.log(date);
    var month = date.getMonth()+1;
    var day = date.getDate();
    var dayOutput = date.getFullYear() + '/' +
        (month<10 ? '0' : '') + month + '/' +
        (day<10 ? '0' : '') + day;
    return dayOutput;
}
// messed up somthing with local storage and am unsure how to fix it
function storeCities(){

  localStorage.setItem("cities", JSON.stringify(cities));
  console.log(localStorage);
    
    for (var i = 0; i < cities.length; i++) {
      var city = cities[i];
      
      var li = $("<li>").text(city);
      li.attr("id","listC");
      li.attr("data-city", city);
      li.attr("class", "list-group-item");
      console.log(li);
      cityList.prepend(li);
    }
    if (!city){
        return
    } 
    else{
        getResponseWeather(city)
    };
}   
  $("#add-city").on("click", function(event){
      event.preventDefault();
    var city = $("#city-input").val().trim();
    if (city === "") {
        return;
    }

    cities.push(city);
   
  storeCities();
  renderCities();
  });
// this will get the city and will display the temp outside at the top 
  function getResponseWeather(cityName){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +cityName+ "&appid=" + key; 

    $("#t-weather").empty();
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
    
      cityTitle = $("<h2>").text(response.name + " "+ FormatDay());
      $("#t-weather").append(cityTitle);
      var TempetureToNum = parseInt((response.main.temp)* 9/5 - 459);
      var cityTemperature = $("<p>").text("Tempeture: "+ TempetureToNum + " °F");
      $("#t-weather").append(cityTemperature);
      var CoordLon = response.coord.lon;
      var CoordLat = response.coord.lat;
 
        var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + key;
            $.ajax({
            url: queryURL3,
            method: "GET"
        }).then(function(response5day) { 
            $("#boxes").empty();
            console.log(response5day);
            for(var i=0, j=0; j<=5; i=i+6){
                var read_date = response5day.list[i].dt;
                if(response5day.list[i].dt != response5day.list[i+1].dt){
                  var FivedayDiv = $("<div>");
                 FivedayDiv.attr("class","col-3 m-2 bg-dark")
                 var d = new Date(0);
                 d.setUTCSeconds(read_date);
                var date = d;
                 console.log(date);
                 var month = date.getMonth()+1;
                var day = date.getDate();
                var dayOutput = date.getFullYear() + '/' +
                (month<10 ? '0' : '') + month + '/' +
                (day<10 ? '0' : '') + day;
                var Fivedayh4 = $("<h6>").text(dayOutput);
                   // these are the little images used for the clouds and sun
                var imgtag = $("<img>");
                 var skyconditions = response5day.list[i].weather[0].main;
                if(skyconditions==="Clouds"){
                        imgtag.attr("src", "https://img.icons8.com/color/48/null/icloud.png")
                 } else if(skyconditions==="Clear"){
                        imgtag.attr("src", "https://img.icons8.com/color/48/null/smiling-sun.png")
                 }else if(skyconditions==="Rain"){
                        imgtag.attr("src", "https://img.icons8.com/color/48/null/intense-rain--v1.png")
                 }
                    // the temps and other things on the 5day forecast api
                var pTemperatureK = response5day.list[i].main.temp;
                 console.log(skyconditions);
                var TempetureToNum = parseInt((pTemperatureK)* 9/5 - 459);
                var pTemperature = $("<p>").text("Tempeture: "+ TempetureToNum + " °F");
                 var pHumidity = $("<p>").text("Humidity: "+ response5day.list[i].main.humidity + " %");
                 FivedayDiv.append(Fivedayh4);
                FivedayDiv.append(imgtag);
                 FivedayDiv.append(pTemperature);
                FivedayDiv.append(pHumidity);
                $("#boxes").append(FivedayDiv);
                console.log(response5day);
                 j++;
             }
            
        }
      
    });
      

    });
    
  }