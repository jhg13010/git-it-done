var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username")

var getUserRepos = function(user) {
    // format the github api url 
    var apiURL = "https://api.github.com/users/" + user + "/repos";

    //make request to the URL
    fetch(apiURL).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
}

var formSubmitHandler = function(event) {
    event.preventDefault();

    //get name and call getUserRepos
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        //clear form
        nameInputEl.value="";
    //alert if empty or not a github user
    } else {
        alert("Please enter a GitHub username");
    }
    console.log(event);
};

userFormEl.addEventListener("submit", formSubmitHandler);
