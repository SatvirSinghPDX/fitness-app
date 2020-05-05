const CategoryUrl = 'https://wger.de/api/v2/exercisecategory';
const EquipmentUrl = 'https://wger.de/api/v2/equipment';
const proxyurl = "https://cors-anywhere.herokuapp.com/";

// Enter your code here
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