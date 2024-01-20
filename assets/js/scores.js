var highScores = document.querySelector("#highscores");
var clear = document.querySelector("#clear");
var initIndex = localStorage.getItem("initIndex");

for(var i=0, j=1; i<initIndex; i++, j++){
    var textContent = localStorage.getItem("initials"+j);
    var li = document.createElement("li");
    li.innerText = textContent;

    highScores.appendChild(li);
}

clear.addEventListener("click", function(event){
    event.preventDefault();

    localStorage.clear();
    highScores.innerHTML = "";
});