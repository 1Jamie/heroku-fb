//setting var(s) that are used
var q = 0;
var z = 0;

//setup clear screen for function
var clearPage = function() {
    document.body.innerHTML = '';
};

//button creation of the top buttons and the more button
//for loading more posts
var startButtons = function () {
    var buttonFeed = document.createElement('button');
    var buttonRefresh = document.createElement('button');
    buttonFeed.setAttribute('id', 'more');
    buttonFeed.textContent = 'Load More';
    buttonRefresh.setAttribute('id', 'refreshBtn');
    buttonRefresh.textContent = 'Refresh';
    document.body.appendChild(buttonFeed);
    console.log('Feed button created');
    document.body.appendChild(buttonRefresh);
    console.log('refreshBtn created');
};

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
    startButtons();
    var uid = response.authResponse.userID;
    var accessToken = response.authResponse.accessToken;
    console.log('ok user is connected will now do postStuff');
    testAPI();
    postStuff();
    findFeed();
    morePosts();

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

//setting up the refresh button
var refresh = function() {
    console.log('got refreshBtn element');
    var loading = document.getElementById('refreshBtn');
    console.log('started listner for refresh button');

    loading.addEventListener('click', function() {
        window.location.reload(true);
    });
};

// setting up login
var loggingIn = function() {
    FB.login(function(response) {
        console.log(response);
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
        } else {
            console.log('user needs to sign into facebook');
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
        }
    });
};

//making divs required for feed and getting more of it
//making the name area for feed
var nameOfPoster = function() {
    var newName = document.createElement("div");
    var setNameId = "postersName" + q;
    newName.setAttribute("id", setNameId);
    newName.style.color = "#4a6ea9";
    console.log("postersName" + q);
    //add the newly created name element into the Dom
    var currentDiv2 = document.getElementById("more");
    document.body.insertBefore(newName, currentDiv2);
};
//makeing divs required for feed and getting more of it
var makeFeedDivs = function() {
    var newDiv = document.createElement("div");
    var setDivID = 'usersFeed' + q;
    newDiv.setAttribute('id', setDivID);
    newDiv.className = "feedBox";
 
    // add the newly created element and its content into the DOM
    var currentDiv = document.getElementById("more");
    document.body.insertBefore(newDiv, currentDiv);
    //add a break so it looks nice with a space between them
    var newBreak = document.createElement("br");
    document.body.insertBefore(newBreak, currentDiv);
    q++;
};

//retrieving feed from facebook
//retrieving feed from facebook
var findFeed = function() {
    FB.api('me/home?fields=name,posts,message,from', function(response) {
        console.log(response);
        //setting a loop to retrieve feed and increase if more is requested
        for (var i = 0; i < 3; i++) {
            nameOfPoster();
            makeFeedDivs();
            var newNameContent = [];
            var newTextContent = [];
            if (response.error) {
                console.log('Error - ' + response.error.message);
                return;
            } else {
                console.log(response);
                newNameContent.push(response.data[z].from.name);
                newTextContent.push(response.data[z].message);
                document.getElementById('postersName' + z).innerHTML = newNameContent;
                document.getElementById('usersFeed' + z).innerHTML = newTextContent;
                console.log("postersName" + q);
                z++;
            }
        }
    });
};
var morePosts = function() {
    console.log('got button element more');
    var loadMore = document.getElementById('more');
    console.log('started listner for more button');
 
    loadMore.addEventListener('click', function() {
        findFeed();
    });
};

var morePosts = function() {
    console.log('got button element more');
    var loadMore = document.getElementById('more');
    console.log('started listener for more button');

    loadMore.addEventListener('click', function() {
        findFeed();
    });
};

//posting
var postStuff = function(stuff) {
    console.log('got to element get');
    var status = document.getElementById('btnPost');
    console.log('event listener started');

    status.addEventListener('click', function() {
        if (stuff) {
            msg = stuff;
        } else {
            msg = document.getElementById('story').value;
        }
        console.log('clicked button');
        //trying new format to see if this will work
        FB.api('/me/feed', 'post', {
            message: msg,
            name: 'Posted from firefox os',
        }, function(data) {
            console.log(data);
        },
        function(response) {
            if (!response && !error.response) {
                console.log('an error occured');
            } else {
                setInterval(findFeed(), 2000);
                document.getElementById('story').value = '';
                console.log('connected and post was made');
                console.log(response);
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
        appId: '1432144570413455',
        cookie: true, // enable cookies to allow the server to access 
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.3' // use version 2.3
    });
    //logging in
    loggingIn();
    //check the login
    checkLoginState();
    refresh();
};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
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
    } else {
        document.getElementById('postStatus').style.display = 'none';
        document.getElementById('getFeed').style.display = 'none';
    }
}