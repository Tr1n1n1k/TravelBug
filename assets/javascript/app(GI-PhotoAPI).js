//Array to populate buttons area with buttons
var searchArray = ['Toronto', 'New York', 'London', 'Paris', 'Rome', 'Tokyo'];

$(function () {
  //the following will run the function populateButtons to populate th buttonArea with the search array and with buttons
  populateButtons(searchArray, 'searchButton', '#buttonsArea');

  //test to make sure JS is loading
  console.log('Page loaded');

  //Function to pupulate the buttonn area with additional search terms when submitted
  //add to the search array, add a class and add to the area (function (Array,class,location))
  function populateButtons(searchArray, classToAdd, areaToAddTo) {
    //emptying out the button area when starting
    $(areaToAddTo).empty();

    //for loop to continuous add search terms to searchArray and modify buttonand searcg area accordingly
    for (var i = 0; i < searchArray.length; i++) {
      //declaring a new button/variable
      var a = $('<button>');
      //when a seach term is entered. I want it to add a class and data type to the new button
      a.addClass(classToAdd);
      a.attr('data-type', searchArray[i]);
      a.text(searchArray[i]);
      //I want to append a to the area to add so the button is displayed
      $(areaToAddTo).append(a);
    }
  }

  //Add more buttons when search new destination pics
  $('#addSearch').on('click', function () {
    var newSearch = $('#search-input')
      .val()
      .trim();
    //pushing it to seach array
    searchArray.push(newSearch);
    newSearch = $('#search-input').val('');
    console.log('input');
    //want to popoulate button to buttosArea
    populateButtons(searchArray, 'searchButton', '#buttonsArea');
    //must return false or page will continuously reload and only show the 3 original buttons.
    return false;
  });

  //---------------------------AJAX PHOTO API---------------------

  //on click event to recognize which button is clicked
  $(document).on('click', '.searchButton', function () {
    $("#cobblestone").hide();
    $("#sunshine").hide();
    //$('#searches').empty();
    var type = $(this).data('type');

    //test to display which button was clicked in console log
    console.log(type);

    var queryURL =
      'https://api.unsplash.com/search/photos/?client_id=d85d792578d18be7524f8d2806e74171d8a77586fe31784a09703e71846770fe&query=' +
      type +
      '&per_page=3&orientation=landscape';

    $.ajax({
      url: queryURL,
      method: 'GET'
    })
      //Done function to get response from API
      .done(function (response) {
        //test to make check if I am getting a response
        console.log(response);

        var arrImg = [];

        for (var i = 0; i < response.results.length; i++) {
          // var name = response.results[i].user.name;
          // var bio = response.results[i].user.bio;
          //var searchDiv = $('<div class="search-item">');
          var imageURL = response.results[i].urls.regular;
          arrImg.push(response.results[i].urls.regular);

          console.log(i);

          //$('#searches').append(searchDiv);
        }
        console.log(arrImg[0]);
        console.log(arrImg[1]);
        console.log(arrImg[2]);

        $('.cImg1').html(
          '<img class="d-block w-100"  src="' +
          arrImg[0] +
          '/800x400?auto=yes&bg=777&fg=555&text=First slide" alt="First Slide">'
        );
        $('.imgInfo1').html('<h3>' + type + '</h3>');
        $('.cImg2').html(
          '<img class="d-block w-100"  src="' +
          arrImg[1] +
          '/800x400?auto=yes&bg=666&fg=444&text=Second slide" alt="Second Slide">'
        );
        $('.imgInfo2').html('<h3>' + type + '</h3>');
        $('.cImg3').html(
          '<img class="d-block w-100"  src="' +
          arrImg[2] +
          '/800x400?auto=yes&bg=555&fg=333&text=Third slide" alt="Thrid Slide">'
        );
        $('.imgInfo3').html('<h3>' + type + '</h3>');
      });

    var APIKey = '166a433c57516f51dfab1f7edaed8413';

    var queryURL =
      'https://api.openweathermap.org/data/2.5/weather?' +
      'q=' +
      type +
      '&units=metric&appid=' +
      APIKey;
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function (response) {
      console.log(queryURL);
      console.log(response);

      $('#city').html('<p> Current Weather in ' + response.name + '</p>');
      $('#wind').html('Wind Speed: ' + response.wind.speed + ' MPS');
      $('#humidity').html('Humidity: ' + response.main.humidity + ' %');
      $('#temp').html('Temperature: ' + response.main.temp + ' C');
      $('#description').html('Description: ' + response.weather[0].description);
    });
    // $(document).on('click', '.searchButton', displayWeatherInfo);
  });
});
//var citys = ['Toronto', 'Paris', 'London', 'Tokyo', 'New York'];

// function currCity() {
//   $('#weather-view').empty();
//   for (var i = 0; i < citys.length; i++) {
//     //TODO : rename variable to something more relevant
//     var currCityAdd = $('<button>');
//     currCityAdd.addClass('searchButton');
//     currCityAdd.attr('data-name', citys[i]);
//     currCityAdd.text(citys[i]);
//     $('#weather-view').append(currCityAdd);
//   }
// }

// $('#search').on('click', function(event) {
//   event.preventDefault();
//   var newCity = $('#search-input').val();
//   citys.push(newCity);

//   //TODO : different function to be used here (with var)
//   //similar functionality to weatherBtn() w/o loop

//   currCity(newCity);
//   console.log(newCity);
//   // return false;
// });

// $(document).on('click', '.searchButton', function(displayWeatherInfo) {
//   var city = $(this).attr('data-name');
//   console.log(city);

// });

// $(document).ready(function() {

//   });

//   currCity();
