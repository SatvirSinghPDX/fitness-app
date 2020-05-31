const muscle = document.getElementById('muscle-group').textContent;
var ExercisesUrl = 'https://wger.de/api/v2/exercise/?language=2&category=' + muscle;
let equipment = 7;
var SCOPES = "https://www.googleapis.com/auth/calendar";

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
                    // wkoutName=obj.name;
                    document.getElementById("exercise-listing").innerHTML += "<div class='exercise-item shadow-lg p-3 mb-5 rounded'>" + 
                    "<label>" + obj.name + "</label>" + "<p>" + obj.description + "</p>" + 
                    '<div class="addWkout"><input type="text" class="add-exercise-input rounded mr-2" name="birthday" id="datePicker" placeholder="Event Date">' + 
                    '<button class="btn btn-primary" id="'+obj.name+'" onclick="addEvent(this);">Add workout</button>' +
                    '<p id="datePicker2" style="display: none;"></p></div></div>';
                    $('input[name="birthday"]').daterangepicker({
                        "singleDatePicker": true,
                        "showDropdowns": true,
                        "minYear": 2020,
                        "maxYear": 2021,
                        "startDate": "05/30/2020",
                        "endDate": "05/08/2020"
                    }, function (start, end, label) {
                        console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
                        var date = start.format('YYYY-MM-DD');
                        document.getElementById("datePicker2").innerHTML = date;
                    });
                    
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

function addEvent(name) {
    var summary = name.id;
    var date = "2020/06/01"
    // var date = document.getElementById("datePicker2").innerHTML;
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
        // appendPre('Event created: ' + event.summary);
        // appendPre2('Date: ' + event.start.date)
    });
}




