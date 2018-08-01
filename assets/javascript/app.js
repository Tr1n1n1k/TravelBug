$(document).ready(function() {
  var citys = ['Toronto', 'Paris', 'London', 'Tokyo', 'New York'];

  function currCity() {
    $('#weather-view').empty();
    for (var i = 0; i < citys.length; i++) {
      //TODO : rename variable to something more relevant
      var currCityAdd = $('<button>');
      currCityAdd.addClass('searchButton');
      currCityAdd.attr('data-name', citys[i]);
      currCityAdd.text(citys[i]);
      $('#weather-view').append(currCityAdd);
    }
  }

  $('#search').on('click', function(event) {
    event.preventDefault();
    var newCity = $('#search-input').val();
    citys.push(newCity);

    //TODO : different function to be used here (with var)
    //similar functionality to weatherBtn() w/o loop

    currCity(newCity);
    console.log(newCity);
    // return false;
  });

  $(document).on('click', '.searchButton', function(displayWeatherInfo) {
    var city = $(this).attr('data-name');
    console.log(city);
    var APIKey = '166a433c57516f51dfab1f7edaed8413';

    var queryURL =
      'https://api.openweathermap.org/data/2.5/weather?' +
      'q=' +
      city +
      '&units=metric&appid=' +
      APIKey;
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {
      console.log(queryURL);
      console.log(response);

      $('#city').html('<h1>' + response.name + ' Weather Details</h1>');
      $('#wind').html('Wind Speed: ' + response.wind.speed + ' MPS');
      $('#humidity').html('Humidity: ' + response.main.humidity + ' %');
      $('#temp').html('Temperature: ' + response.main.temp + ' C');
      $('#description').html('Description: ' + response.weather[0].description);
    });
    $(document).on('click', '.searchButton', displayWeatherInfo);
  });

  currCity();
});
