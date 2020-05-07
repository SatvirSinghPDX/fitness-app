const CategoryUrl = 'https://wger.de/api/v2/exercisecategory';
const EquipmentUrl = 'https://wger.de/api/v2/equipment';
const proxyurl = "https://cors-anywhere.herokuapp.com/";

// Enter your code here
function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    document.getElementById("welcome").innerHTML += ", " + googleUser.getBasicProfile().getName();
    /* document.getElementById("imageField").src = googleUser.getBasicProfile().getImageUrl(); */
    /* document.getElementById("Username").innerHTML = googleUser.getBasicProfile().getName();
    document.getElementById("Username").style.color = "red"; */
}
function onFailure(error) {
    console.log(error);
}
function renderButton() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}
/* function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
} */
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        document.getElementById("welcome").innerHTML = 'Welcome';
       /*  document.getElementById("Username").innerHTML = 'User signed out';
        document.getElementById("Username").style.color = "red"; */
    });
}
fetch(CategoryUrl)
    .then(
        function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }
            response.json().then(function (data) {
                for (i = 0; i < 7; i++) {
                    document.getElementById("category-menu").innerHTML += "<a id='dropdown-item' href='#'>" + data.results[i].name + "</a>" + "<br />";
                }
            });
        }
    )
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });
document.getElementById("category-menu").style.fontSize = "1em";