// DOMContentLoaded is fired once the document has been loaded and parsed,
// but without waiting for other external resources to load (css/images/etc)
// That makes the app more responsive and perceived as faster.
// https://developer.mozilla.org/Web/Reference/Events/DOMContentLoaded
window.addEventListener('DOMContentLoaded', function() {

  // We'll ask the browser to use strict code to help us catch errors earlier.
  // https://developer.mozilla.org/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode
  'use strict';

  var translate = navigator.mozL10n.get;

  // We want to wait until the localisations library has loaded all the strings.
  // So we'll tell it to let us know once it's ready.
  navigator.mozL10n.once(start);

  // ---

  function start() {

    var message = document.getElementById('message');

    // We're using textContent because inserting content from external sources into your page using innerHTML can be dangerous.
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
		FB.getLoginStatus(function(response) {
		  if (response.status === 'connected') {
			// the user is logged in and has authenticated your
			// app, and response.authResponse supplies
			// the user's ID, a valid access token, a signed
			// request, and the time the access token 
			// and signed request each expire
			var uid = response.authResponse.userID;
			var accessToken = response.authResponse.accessToken;
			alert('ok user is connected');
		  } else if (response.status === 'not_authorized') {
			// the user is logged in to Facebook, 
			// but has not authenticated your app
			alert('user have not authenticated app');
		  } else {
			// the user isn't logged in to Facebook.
			alert('user isnt logged into facebook');
		  }
		 });
	};
	alert('starting ' + window.location.href.replace('index.html',''));
	console.log('0');
	var d = document;
	var s = 'script';
	var id = 'facebook-jssdk';
	var js = d.createElement(s);
	console.log('1');
	js.id = id;
	js.src = window.location.href.replace('index.html', '') + "/js/fbsdk.js";
	console.log('2');
	document.head.appendChild(js);
	console.log('ok got here no issue');
  }

});
