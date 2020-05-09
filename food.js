const url = 'https://api.spoonacular.com/recipes/random?number=20&tags=vegetarian&apiKey=ed5d36b12a2448308cb411d99ccc2a06';

fetch(url)
    .then(
        function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }
            response.json().then(function (data) {
                for (i = 0; i < 20; i++) {
                    console.log(data.recipes[i].title);
                    console.log(data.recipes[i].image);
                    console.log(data.recipes[i].healthScore);
                    var healthScore = data.recipes[i].healthScore;
                    var dairyFree = data.recipes[i].dairyFree;
                    if (dairyFree == true)
                        dairyFree = "Yes";
                    else
                        dairyFree = "No";
                    var glutenFree = data.recipes[i].glutenFree;
                    if (glutenFree == true)
                        glutenFree = "Yes";
                    else
                        glutenFree = "No";
                    var vegan = data.recipes[i].vegan;
                    if (vegan == true)
                        vegan = "Yes";
                    else
                        vegan = "No";
                    var lowFodmap = data.recipes[i].lowFodmap;
                    if (lowFodmap == true)
                        lowFodmap = "Yes";
                    else
                        lowFodmap = "No";
                    document.getElementById("foodCardDiv").innerHTML += "<div id='foodCards' class='card'><img  data-toggle='modal' data-target='#exampleModalCenter" + i + "' id='foodCardImg' class='card-img-top' src='" + data.recipes[i].image + "' alt='Card image cap'><div class='card-body'><a id='foodName' class='card-text' href='" + data.recipes[i].spoonacularSourceUrl + "'>" + data.recipes[i].title + "</a></div></div>";
                    document.getElementById("popupBox").innerHTML += "<div class='modal fade' id='exampleModalCenter" + i + "' tabindex='-1' role='dialog' aria-labelledby='exampleModalCenterTitle' aria-hidden='true'> </div>";
                    document.getElementById("exampleModalCenter" + i).innerHTML = "<div class='modal-dialog modal-dialog-centered' role='document'> <div class='modal-content'> <div class='modal-header'> <h3 class='modal-title' id='exampleModalLongTitle'>" + data.recipes[i].title + "</h3> <button type='button' class='close' data-dismiss='modal' aria-label='Close'> <span aria-hidden='true'>&times;</span> </button> </div> <div class='modal-body' id='popupBody'>" + "Health Score: " + healthScore + "<br /> Dairy Free: " + dairyFree + "<br /> Gluten Free: " + glutenFree + "<br /> Vegan: " + vegan + "<br /> Low Fodmap: " + lowFodmap + "</div> </div> </div>";
                }
            });
        }
    )
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });