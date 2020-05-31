const CategoryUrl = 'https://wger.de/api/v2/exercisecategory';
const EquipmentUrl = 'https://wger.de/api/v2/equipment';
const proxyurl = "https://cors-anywhere.herokuapp.com/";

// Enter your code here
function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    document.getElementById("welcome").innerHTML += ", " + googleUser.getBasicProfile().getName() + '!';
    console.log(document.getElementById("nameField").innerHTML);
    document.getElementById("nameField").innerHTML = googleUser.getBasicProfile().getName();
    document.getElementById("profilePic").src = googleUser.getBasicProfile().getImageUrl();
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

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        document.getElementById("welcome").innerHTML = 'Welcome';
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
                    document.getElementById("category-menu").innerHTML += "<a id='dropdown-item' href='" + data.results[i].name + ".html'>" + data.results[i].name + "</a>" + "<br />";
                }
            });
        }
    )
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });
document.getElementById("category-menu").style.fontSize = "1em";