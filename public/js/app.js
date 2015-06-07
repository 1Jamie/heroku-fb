//setting var that is used
var z = 3;
//this is current setup
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().

  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    var uid = response.authResponse.userID;
    var accessToken = response.authResponse.accessToken;
    console.log('ok user is connected will now do postStuff');
    postStuff('test');
    findFeed();
    testAPI();
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    document.getElementById('myProfile').innerHTML = 'Please log into this app.';
    displayDiv(false);
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    document.getElementById('myProfile').innerHTML = 'Please log into Facebook.';
    displayDiv(false);
  }
}
//retrieving feed
var findFeed = function() {
  FB.api('me?fields=id,name,posts.limit(25)',function(response){
    console.log(response); 
    var newTextContent = [];
    for (var i=0; i<z; i++) {
      newTextContent.push(response.posts.data[i].from.name + ' - ' + 
        response.posts.data[i].message);
      document.getElementById('usersFeed'+i).innerHTML = newTextContent.join(' | ');
    }
  } 
  );
};
var morePosts = function(loading) {
  console.log('got button element more');
  var loadMore = document.getElementById('more');
  console.log('started listner for more button');

  loadMore.addEventListener('click', function(){
    z=z+3;
    if (loading){
      findFeed();
    }
    else {
      console.log('error loading feed');
      alert('error getting feed');
    }
  });
};
//posting
var postStuff = function(stuff) {
  console.log('got to element get');
  var status = document.getElementById('btnPost');
  console.log('event listener started');

  status.addEventListener('click', function() {
    if (stuff){
      msg = stuff;
    } else {
      msg = document.getElementById('story').value;
    }
    console.log('clicked button');
      //trying new format to see if this will work
      FB.api('/me/feed', 'post', {
        message:msg,
        name: 'Posted from firefox os',
      },function(data) {
        console.log(data);
      },
      function(response) {
        if (!response && !error.response) {
          console.log('an error occured');
        } else {
          console.log('connected and post was made');
        }
      }
      );
    }, false);
};

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}
//testing to see if cookie : true works better for performance
window.fbAsyncInit = function() {
  FB.init({
    appId      : '1432144570413455',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.3' // use version 2.3
  });

    //check the login
    checkLoginState();
  };

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "js/fbsdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
  console.log('Welcome! Fetching your information.... ');
  FB.api('/me?fields=name,picture', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('myProfile').innerHTML =
    '<img src="' + response.picture.data.url + '"> ' + 'You\'re logged in as \n' + response.name;
    displayDiv(true);
  });
}

function displayDiv(value) {
  if (value) {
    document.getElementById('postStatus').style.display = 'block';
    document.getElementById('getFeed').style.display = 'block';
  }
  else {
    document.getElementById('postStatus').style.display = 'none';
    document.getElementById('getFeed').style.display = 'none';
  }
}