$(document).ready(function() {
  var fahrenheit, celsius;
  var weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  var apiKey = '14cdfc0f69ac16497d5267b06df4ae0d';
  getLatLong();

  function getLatLong() {
    $.ajax({
      url: 'https://geoip-db.com/json/',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        var lat = '';
        var long = data.longitude;
        $('.city').html(data.city);
        $('.country').html(data.country_name);
        weatherApiUrl +=
          '?lat=' + lat + '&lon=' + long + '&APPID=' + apiKey + '&units=metric';
      }
    });
  }
});
