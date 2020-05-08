const url = 'https://api.edamam.com/api/food-database/parser?ingr=red%20apple&app_id=84c143f5&app_key=3047f4648d5c558bf5af46e7912ce6e9';
const newUrl = 'https://api.spoonacular.com/recipes/random?number=20&tags=vegetarian&apiKey=ed5d36b12a2448308cb411d99ccc2a06';


/* fetch(url)
    .then(
        function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }
            response.json().then(function (data) {
                for (i = 0; i < 4; i++) {
                    document.getElementById("foodCardDiv").innerHTML += "<div id='foodCards' class='card'><img class='card-img-top' src='Foodplate.jpg' alt='Card image cap'><div class='card-body'><p id='foodName' class='card-text'>Food name and description.</p></div></div>";
                    document.getElementById("foodName").innerHTML = data.text;
                    document.getElementById("foodName").style.textTransform = "uppercase";
                    console.log("<a id='dropdown-item' href='#'>" + data.text + "</a>" + "<br />");
                }
            });
        }
    )
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    }); */

    fetch(newUrl)
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
                    document.getElementById("foodCardDiv").innerHTML += "<div id='foodCards' class='card'><img id='foodCardImg' class='card-img-top' src='" + data.recipes[i].image + "' alt='Card image cap'><div class='card-body'><p id='foodName' class='card-text'>" + data.recipes[i].title + "</p></div></div>";
                    /* document.getElementById("category-menu").innerHTML += "<a id='dropdown-item' href='#'>" + data.results[i].name + "</a>" + "<br />"; */
                }
            });
        }
    )
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });