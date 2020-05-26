var ExercisesUrl = 'https://wger.de/api/v2/exercise/?page=1'
const muscle = document.getElementById('muscle-group').textContent;
let equipment = 1;
// console.log(muscle);

function filterEquipment(eqp) { 
    equipment = eqp.value; 
    document.getElementById("TRYME").innerHTML = "";
    getExercises();
} 

function getExercises() {
   fetch(ExercisesUrl)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(function (obj) { 
                console.log("searching")
                if (obj.equipment.length == 0) {
                    obj.equipment.push(7);
                }
                if (obj.name !== '' && obj.equipment == equipment && obj.language === 2 && obj.category == muscle) {
                    console.log("muscle " + obj.category);
                    console.log("equipment " + obj.equipment);
                    document.getElementById("TRYME").innerHTML += "<p>" + obj.name + "</p>";
                }
            }); 
            if(data.next !== null) {
                ExercisesUrl = data.next;
                getExercises(muscle, equipment);
            }
            else {
                ExercisesUrl = 'https://wger.de/api/v2/exercise/?page=1';
            }
            
        })
        .catch(error => {
            console.log(error);
        });

};