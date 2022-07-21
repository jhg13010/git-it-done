var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username")
// variable to add items to the righthand column of the page
var repoContainerEl = document.querySelector("#repos-container")
//variable to add headers to the items in the righthand column of the page 
var repoSearchTerm = document.querySelector("#repo-search-term")

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
    //sets up the repoContainerEl to be displayed, although blank - functionality comes later
    repoContainerEl.textContent = "";
    //sets up header for the search 
    repoSearchTerm.textContent = searchTerm

    // loops over the array of repositories from the JSON data output of the username search 
    for  (var i = 0; i < repos.length; i++) {

        //repos[i].owner.login finds the owners array in the data of the 1st repository in the initial data output and locates the login attribute (i.e. jhg13010)
        //repos[i].name finds the name attribute in the data of the 1st repository in the initial data output (conflict-resolution)
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //creates an individual list element ("div") for each iteration [i] 
        var repoEl = document.createElement("div");
        //assigns the clases to ensure the "div" follows the css framework
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        //creates the title element that will live as the header inside the repoEl 
        var titleEl = document.createElement("span");
        //assigns repoName (i.e the login and repository name) as the test of the titleEl
        titleEl.textContent = repoName;

        //adds the titleEl to the repoEl
        repoEl.appendChild(titleEl);

        //adds the repoEl to the container 
        repoContainerEl.appendChild(repoEl);
    }
    
    
    //will console log the data in JSON form due to the response.json method in getUserRepos
    console.log(repos);
    //will console log the username that has been passed through the formSubmitHandler and the getUserRepos function
    console.log(searchTerm);
}

//calls formSubmitHandler when a username has been submitted on the frontend form
userFormEl.addEventListener("submit", formSubmitHandler);
