// DOMContentLoaded is fired once the document has been loaded and parsed,
// but without waiting for other external resources to load (css/images/etc)
// That makes the app more responsive and perceived as faster.
// https://developer.mozilla.org/Web/Reference/Events/DOMContentLoaded
// We'll ask the browser to use strict code to help us catch errors earlier.
// https://developer.mozilla.org/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode
'use strict';

/**
 * I can't believe that FFOS webapps require you to put your entire script behind a listener ...
 * its can be optional... i dont use it in my notification test app
 * This platform / wireframe can't be optimal
 *
 * Yoric says: I never did that for my FFOS webapps.
 */
window.addEventListener('DOMContentLoaded', () => {
  var translate = navigator.mozL10n.get;

  /**
   * Function definitions first, triggered after localization library completes.
   */
  function start() {
    var message = document.getElementById('message');

    // We use textContent, inserting content from external sources in your page using innerHTML can be dangerous.
    // https://developer.mozilla.org/Web/API/Element.innerHTML#Security_considerations
    message.textContent = 'now loading fb';

    window.fbAsyncInit = function fbAsyncInit() {
      message.textContent = 'fb loaded will now try init';

      FB.init({
        status: true,
        appId: '1432144570413455',
        xfbml: true,
        version: 'v2.3'
      });

      var postLogin = function() {
        //runs the button init
		alert('staring postLogin');
        console.log('got to element get')
        var button = document.getElementById('btnPost'); // try to use getelement id isntead of its much faster
        console.log('event listener started')
          /**
           * * After we define the message handler and callback, we ...
           */
          //error is somewhere around here as far as i know
        button.addEventListener('click', function() {
		  alert('clicked btn');
          console.log('clicked button');
          FB.api('/me/post', 'post', {
              message: 'test'
            },
            function(response) {
			  alert('postLogin FB.api post reponse received', 'response:', response);
              if (!response && !error.response) {
                console.log('an error occured')
              } else {
                console.log('connected and post was made')
              }
            }
          );

        }, false);
		alert('did postLogin');
      };

      FB.getLoginStatus(response => {
        if (response.status === 'connected') {
          // the user is logged in and has authenticated your
          // app, and response.authResponse supplies
          // the user's ID, a valid access token, a signed
          // request, and the time the access token 
          // and signed request each expire
          var uid = response.authResponse.userID;
          var accessToken = response.authResponse.accessToken;
          alert('ok user is connected will now do postLogin');
          postLogin();
		  alert('ok did post login');
        } else if (response.status === 'not_authorized') {
          // the user is logged in to Facebook, 
          // but has not authenticated your app
          alert('user has not authenticated app');
        } else {
          // the user isn't logged in to Facebook.
          alert('user isnt logged into facebook, will prompt you to login now now');
          // if not logged in ask them to login
          FB.login(function() {
            // do something here
            //the fb.login does doe what i needed to call the login, and the function response
            //check to make sure they did
            //window.location.reload(); // reload app
            alert('ok logged you in will now do postLogin')
            postLogin();
			alert('ok did post login');
          }, {
			  scope: 'publish_actions'
		  }); // need to look at facebook api for this
		  alert('should have triggered login');
        }
      });



    };

    alert('starting ' + window.location.href.replace('index.html', ''));

    // This is ugly clean it up
      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) return;
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/es_LA/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'))
    console.log('ok got here no issue');
  }

  // We want to wait until the localisations library has loaded all the strings.
  // might remove the localisations since facebook will do it for itself
  // So we'll tell it to let us know once it's ready.
  navigator.mozL10n.once(start);

});
// this here is the good code