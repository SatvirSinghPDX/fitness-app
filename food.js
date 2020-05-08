//const url = 'https://api.spoonacular.com/recipes/random?number=20&tags=vegetarian&apiKey=ed5d36b12a2448308cb411d99ccc2a06';

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
                    document.getElementById("foodCardDiv").innerHTML += "<div id='foodCards' class='card'><img id='foodCardImg' class='card-img-top' src='" + data.recipes[i].image + "' alt='Card image cap'><div class='card-body'><a id='foodName' class='card-text' href='" + data.recipes[i].spoonacularSourceUrl + "'>" + data.recipes[i].title + "</a></div></div>";
                }
            });
        }
    )
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });