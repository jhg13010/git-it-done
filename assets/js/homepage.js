var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username")
// variable to add items to the righthand column of the page
var repoContainerEl = document.querySelector("#repos-container")
//variable to add headers to the items in the righthand column of the page 
var repoSearchTerm = document.querySelector("#repo-search-term")
//variable to call received click event for language selector 
var languageButtonsEl = document.querySelector("#language-buttons")

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

    //make request to the URL 
    fetch(apiURL)
        //use the request response as a function parameter
        .then(function(response) {
        //check to see if github found a user ==> 'ok' property will check to see if status code is in 200's
        if (response.ok) {
            //reads the reponse as JSON and calls a function using the JSON data 
            response.json().then(function(data) {
                //calls the displayRepos function using the JSON data and the username from input form as parameters 
                displayRepos(data, user);
            });
        } else {
            //if status code is in the 400's, a user hasn't be found
            alert("Error: Github User Not Found");
        }
    })
    //no semi-colon above "chains" .catch to the .then method 
    //.catch will "catch" an error in running the function if there is a network issue 
    .catch(function(error) {
        alert("Unable to connect to GitHub");
    });
};

//called from the getUserRepos function
//repos = dataa 
//searchTerm = username from input form
var displayRepos = function(repos, searchTerm) {
    //check to see if user has any repositories 
    if (repos.length === 0) {
        //if array is empty (array = 0), tell the requester 
        repoContainerEl.textContent = "No repositories found";
        //returns undefined to console
        return;
    };
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
        var repoEl = document.createElement("a");
        //assigns the clases to ensure the "div" follows the css framework
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        //assigns link to the repo element to bring user to the single-repo page 
        //the "?repo= + repoName" is the query that will be used to find the issues for a specific repo
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        //creates the title element that will live as the header inside the repoEl 
        var titleEl = document.createElement("span");
        //assigns repoName (i.e the login and repository name) as the test of the titleEl
        titleEl.textContent = repoName;

        //adds the titleEl to the repoEl
        repoEl.appendChild(titleEl);

        //creates status element that will be added to the repoEl 
        var statusEl = document.createElement("span");
        //assigns the class to ensure the "span" follows the css framework
        statusEl.classList = "flew-row align-center";

        //finds the open_issues_count attribute and inspects IF the value is greater than 0 
        if (repos[i].open_issues_count > 0) {
            //if greater than 0, pull an alert icon from the css framework and add the count of open issues 
            statusEl.innerHTML = 
                "<i class = 'fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            //if 0, pull an checkbox icon from the css framework
            statusEl.innerHTML = "<i class = ' fas fa-check-square status-icon icon-success'></i>";
        }

        //append the icons and issues count to the repoEl
        repoEl.appendChild(statusEl);

        //adds the repoEl, with the title and status, to the container 
        repoContainerEl.appendChild(repoEl);
    }
}

//function to receive click event from language buttons
var buttonClickHandler = function(event) {
    //variable to find the language button that was clicked using the data-language attribute
    var language = event.target.getAttribute("data-language");
    
    if (langauge) {
        //call getFeatureRepos function to display repos with issues in a specific language
        getFeaturedRepos(language);

        //reset content in form input box to prepare for new search 
        repoContainerEl.textContent = "";
    };

     
}

//function to find repositories that are written in a specific language
var getFeaturedRepos = function(language) {
    //api endpoint URL to search for a repositories with issues, that are written in a certain langauge
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "is:featured&sort=help-wanted-issues";

    //requests feedback from URL and passes response through a function
    fetch(apiUrl).then(function(response) {
        //check to see if github found a user ==> 'ok' property will check to see if status code is in 200's
        if (response.ok) {
            //converts response to JSON and accesses the data
            response.json().then(function(data) {
                //calls displayRepos function using the items array as the repos to iterate through and the language as the search criteria 
                displayRepos(data.items, language);
            });
        } else {
            alert("Error: GitHub User Not Found");
        };
    });
};

//calls formSubmitHandler when a username has been submitted on the frontend form
userFormEl.addEventListener("submit", formSubmitHandler);
//calls buttonClickHandler when a type of language is selected 
languageButtonsEl.addEventListener("click", buttonClickHandler);
