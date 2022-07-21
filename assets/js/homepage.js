var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username")

var formSubmitHandler = function(event) {
    event.preventDefault();

    //get name from the form input in HTML
    var username = nameInputEl.value.trim();

    if (username) {
        //call getUserRepos, using the username as the parameter
        getUserRepos(username);
        //clear form
        nameInputEl.value="";
    //alert if empty or not a github user
    } else {
        alert("Please enter a GitHub username");
    }
    console.log(event);
};

//the username from the form input is the "user" parameter
var getUserRepos = function(user) {
    // format the github api url 
    var apiURL = "https://api.github.com/users/" + user + "/repos";

    //make request to the URL and use the request response as a function parameter
    fetch(apiURL).then(function(response) {
        //reads the reponse as JSON and calls a function using the JSON data 
        response.json().then(function(data) {
            //calls the displayRepos function using the JSON data and the username from input form as parameters 
            displayRepos(data, user);
        });
    });
}

//called from the getUserRepos function
//repos = dataa 
//searchTerm = username from input form
var displayRepos = function(repos, searchTerm) {
    //will console log the data in JSON form due to the response.json method in getUserRepos
    console.log(repos);
    //will console log the username that has been passed through the formSubmitHandler and the getUserRepos function
    console.log(searchTerm);
}

//calls formSubmitHandler when a username has been submitted on the frontend form
userFormEl.addEventListener("submit", formSubmitHandler);
