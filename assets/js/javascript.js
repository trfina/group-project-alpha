const API_KEY = "RGAPI-2227c53f-77f9-44df-b194-43551ad47f54";
// var apiAccount = "";
// var apiFreeWeek = "";


// import {callSummonerv4} from "./file";
// then export funtcion from another file
var btnGetAccount = document.querySelector("#getAccount");
var btnGetFreeWeek = document.querySelector("#getFreeWeek");

async function callSummonerv4() {
    var accountName = document.getElementById("inputAccount").value;
    var APICallString = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + accountName + "?api_key=" + API_KEY;
    var summonerIcon = document.querySelector("#accIcon");
    var summonerName = document.querySelector("#accName");
    var summonerLevel = document.querySelector("#accLevel");

    fetch(APICallString)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        
        summonerIcon.setAttribute('src',"./assets/profileicon/"  + data.profileIconId + ".png");
        summonerName.innerHTML = "<b>" + data.name + "</b>";
        summonerLevel.innerHTML = "<b>" + "Summoner Level: " + data.summonerLevel + "</b>";
    })
}

btnGetAccount.addEventListener('click', callSummonerv4);

function callChampionRotation() {
    var APICallString = "https://na1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=" + API_KEY
    
    fetch(APICallString)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })
}
btnGetFreeWeek.addEventListener('click', callChampionRotation);