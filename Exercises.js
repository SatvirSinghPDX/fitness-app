const muscle = document.getElementById('muscle-group').textContent;
var ExercisesUrl = 'https://wger.de/api/v2/exercise/?language=2&category=' + muscle;
let equipment = 7;

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
                if (obj.name !== '' && obj.description !== '') {
                    document.getElementById("exercise-listing").innerHTML += "<div class='exercise-item shadow-lg p-3 mb-5 rounded'>" + "<label>" + obj.name + "</label>" + "<p>" + obj.description + "</p>" + "</div>";
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