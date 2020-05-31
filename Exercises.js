const muscle = document.getElementById('muscle-group').textContent;
var ExercisesUrl = 'https://wger.de/api/v2/exercise/?language=2&category=' + muscle;
let equipment = 7;
var SCOPES = "https://www.googleapis.com/auth/calendar";
// var calendar  = "https://apis.google.com/js/api.js";

function filterEquipment(eqp) { 
    document.getElementById("exercise-listing").innerHTML = "";
    equipment = eqp.value; 

    if (equipment != 11) {
        ExercisesUrl += '&equipment=' + equipment;
    }
    getExercises();
} 

function getExercises() {
    console.log(ExercisesUrl)
   fetch(ExercisesUrl)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(function (obj) { 
                if (obj.name !== '' && obj.description !== '' && obj.description.length > 150 && obj.description.length < 530) {
                    document.getElementById("exercise-listing").innerHTML += "<div class='exercise-item shadow-lg p-3 mb-5 rounded'>" + 
                    "<label>" + obj.name + "</label>" + "<p>" + obj.description + "</p>" + 
                    '<div class="addWkout"><input id="'+obj.name+'1" type="text" class="add-exercise-input rounded mr-2" name="birthday" placeholder="Event Date">' + 
                    '<button class="btn btn-primary" id="'+obj.name+'" onclick="addEvent(this);">Add workout</button>' +
                    '<p style="display: none;"></p></div></div>';
                    $('input[name="birthday"]').daterangepicker({
                        "singleDatePicker": true,
                        "showDropdowns": true,
                        "minYear": 2020,
                        "maxYear": 2021,
                        "startDate": "05/30/2020",
                        "endDate": "05/08/2020"
                    }
                    , 
                    // function (start, end, label) {
                    //     console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
                    //     var date = start.format('YYYY-MM-DD');
                    //     var myId = obj.name+'1';
                    //     document.getElementById(myId).innerHTML = date;
                        
                    // }
                    );
                    
                }
            }); 
            if(data.next !== null) {
                ExercisesUrl = data.next;
                getExercises();
            }
            else {
                ExercisesUrl = 'https://wger.de/api/v2/exercise/?language=2&category=' + muscle;
            }
            
        })
        .catch(error => {
            console.log(error);
        });

        

};



// Client ID and API key from the Developer Console
/* var CLIENT_ID = '404590272565-d84tulqi057jpvhi9i0nmu052al10v1h.apps.googleusercontent.com'; */
var CLIENT_ID = '354153906034-113gfrsbs38e5kc165fj87abvl7kg2jj.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBKv50aqKDTVlLvSCl_ux3idwNMHdyX7xA';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function (error) {
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        // authorizeButton.style.display = 'none';
        // signoutButton.style.display = 'none';
        // listUpcomingEvents();
        // document.getElementById("addEventDiv").style.display = 'block';
    } else {
        // authorizeButton.style.display = 'none';
        // signoutButton.style.display = 'none';
        // document.getElementById("addEventDiv").style.display = 'none';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}




function addEvent(name) {
    var summary = name.id;
    var myId = name.id+'1'
    var rawDate1 = document.getElementById(myId).value
    var year = rawDate1.slice(6, 10);
    var day = rawDate1.slice(3, 5);
    var month = rawDate1.slice(0, 2);
    var date = [year, month, day].join('-');

    var event = {
        'summary': summary,
        'location': '',
        'description': '',
        'start': {
            'date': date,
            'timeZone': 'America/Los_Angeles'
        },
        'end': {
            'date': date,
            'timeZone': 'America/Los_Angeles'
        },
        'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=1'
        ],
        'attendees': [],
        'reminders': {
            'useDefault': false,
            'overrides': [
                { 'method': 'email', 'minutes': 24 * 60 },
                { 'method': 'popup', 'minutes': 10 }
            ]
        }
    };

    var request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event
    });

    request.execute(function (event) {
        alert("workout added");
    });
}
