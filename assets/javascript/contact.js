$(function() {
  var config = {
    apiKey: 'AIzaSyAmcbVqBzXY_IKr64Mtb4G4Ztv3V5QfeJc',
    authDomain: 'travel-bug-bd8f2.firebaseapp.com',
    databaseURL: 'https://travel-bug-bd8f2.firebaseio.com',
    projectId: 'travel-bug-bd8f2',
    storageBucket: 'travel-bug-bd8f2.appspot.com',
    messagingSenderId: '487593755268'
  };
  firebase.initializeApp(config);

  $('.js-form').on('submit', event => {
    event.preventDefault();
    const name = $('#name').val();
    const email = $('#email').val();
    const message = $('#message').val();
    console.log(name, email, message);

    firebase
      .database()
      .ref('messages')
      .push({
        name,
        email,
        message
      });

    alert('Thank you your message has been submitted we value your input.');

    $('.js-form').trigger('reset');
  });
});
