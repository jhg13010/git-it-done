var issueContainerEl = document.querySelector("#issues-container");

//executes the function on the search repository
var getRepoIssues = function(repo) {
    //variable to access the github api and access the issues of a specific user's repo
    //repo must contain the username and repo name 
    var apiURL = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    //fetch the issues of a user's repository; then verify response is OK 
    fetch(apiURL).then(function(response) {
        //verify response is in 200s
        if (response.ok) {
            //convert response to JSON, then run function on the JSON data
            response.json().then(function(data) {
                //pass array of issues in JSON format to a new function that will pull out DOM elements 
                displayIssues(data);
            });
        } else {
            //alert that there was no data (404)
            alert("There was a problem with your request");
        }
    });
};

var displayIssues = function(issues){
    //provide user feedback if repo being searched has no issues 
    if (issues.length === 0) {
        issueContainerEl.textContent = "This page has no open issues!";
        return;
    };
    //for each issue in a repository 
    for (var i=0; i < issues.length; i++) {
        //create an issue element with an "a" tag to enable linking an html reference 
        var issueEl = document.createElement("a");
        //assign classes to follow css framework
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        //pull out the html DOM element from the issues array data and assign it as an attribute to the "a" element to link to github
        issueEl.setAttribute = ("href", issues[i].html_url);
        //target="_blank" will open the github issue URL in a new tab rather than replace current window 
        issueEl.setAttribute = ("target", "_blank");

        var titleEl = document.createElement("span");
           //pull out the title DOM element from the issues array
        titleEl.textContent = issues[i].title;
    
        //append the title to the issue container
        issueEl.appendChild(titleEl);
    
        //create element to define the type of issue
        var typeEl = document.createElement("span");
    
        //identify if issue is a pull request
        if (issues[i].pull_request) {
            //if yes, inidcate pull request as text content of typeEl 
            typeEl.textContent = "(Pull request)";
        } else {
            //if no, indicate issue as text content of typeEl
            typeEl.textContent = "(Issue)";
        }
        //append the type to the issue container 
        issueEl.appendChild(typeEl);
    };

    //append individual issue containter to the overall issues container list 
    issueContainerEl.appendChild(issueEl);
};

getRepoIssues("facebook/react");