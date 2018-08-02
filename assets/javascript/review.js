$(function () {
  // link to firebase //////
  // Initialize Firebase
  var config = {
    apiKey: 'AIzaSyDf6lNtTitZt7KixAr2EJLOD6ZNLUwU1qU',
    authDomain: 'table-67a45.firebaseapp.com',
    databaseURL: 'https://table-67a45.firebaseio.com',
    projectId: 'table-67a45',
    storageBucket: '',
    messagingSenderId: '14544030360'
  };
  firebase.initializeApp(config);

  // Create a variable to reference the database.
  var database = firebase.database();

  // -----------------------------

  // connectionsRef references a specific location in our database.
  // All of our connections will be stored in this directory.
  var connectionsRef = database.ref('/connections');

  // '.info/connected' is a special location provided by Firebase that is updated
  // every time the client's connection state changes.
  // '.info/connected' is a boolean value, true if the client is connected and false if they are not.
  var connectedRef = database.ref('.info/connected');

  // When the client's connection state changes...
  // connectedRef.on('value', function(snap) {
  //   If they are connected..
  //   if (snap.val()) {
  //     Add user to the connections list.
  //     var con = connectionsRef.push(true);
  //     Remove user from the connection list when they disconnect.
  //     con.onDisconnect().remove();
  //   }
  //});
  $('.form-group').on('submit', function (event) {
    event.preventDefault();

    var usernameInput = $('#usernameInput')
      .val()
      .trim();
    var destinationInput = $('#destinationInput')
      .val()
      .trim();
    var activitiesInput = $('#activitiesInput')
      .val()
      .trim();

    var ratingInput = $('#ratingInput')
      .val()
      .trim();
    var pricingInput = $('#pricingInput')
      .val()
      .trim();

    // test if variables  are entered

    console.log(usernameInput);
    console.log(destinationInput);
    console.log(activitiesInput);
    console.log(ratingInput);
    console.log(pricingInput);

    var newVacay = {
      name: usernameInput,
      destination: destinationInput,
      activities: activitiesInput,
      rating: ratingInput,
      price: pricingInput
    };

    console.log(newVacay.name);
    console.log(newVacay.destination);
    console.log(newVacay.activities);
    console.log(newVacay.rating);

    //  pushes vacay info to firebase
    database.ref().push(newVacay);

    alert("Your Review Has Been Added!");

    // Clears all of the text-boxes
    $('#usernameInput').val('');
    $('#destinationInput').val('');
    $('#activitiesInput').val('');
    $('#ratingInput').val('');
    $('#pricingInput').val('');
  });
  // Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on('child_added', function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var activities = childSnapshot.val().activities;
    var rating = childSnapshot.val().rating;
    var price = childSnapshot.val().price;

    // Inputted info Info
    console.log(name);
    console.log(destination);
    console.log(activities);
    console.log(rating);
    console.log(price);

    // Create the new row
    var newRow = $('<tr>').append(
      $('<td>').text(name),
      $('<td>').text(destination),
      $('<td>').text(activities),
      $('<td>').text(rating),
      $('<td>').text(price)
    );

    // Append the new row to the table
    $('#reviewTable > tbody').append(newRow);
  });
});
