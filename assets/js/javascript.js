
const API_KEY = "RGAPI-38d48142-ee11-462f-8797-1b49234f8261";

// old api key const API_KEY = "RGAPI-2227c53f-77f9-44df-b194-43551ad47f54";
// const API_KEY = "RGAPI-0b9a4891-6ded-4ff4-aafd-e06031092ce4";

var btnGetAccount = document.querySelector("#getAccount");
var btnGetFreeWeek = document.querySelector("#getFreeWeek");
var showEffectOne = document.getElementById("hides1");
var showEffectTwo = document.getElementById("weekly-champs");
var freeWeekChampKey = [];
showEffectOne.style.display = "none";
showEffectTwo.style.display = "none";



async function callSummonerv4() {

    showEffectOne.style.display = "block";

    var accountName = document.getElementById("lol-username").value;
    var APICallString = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + accountName + "?api_key=" + API_KEY;
    var summonerIcon = document.querySelector("#accIcon");
    var summonerName = document.querySelector("#accName");
    var summonerLevel = document.querySelector("#accLevel");

    fetch(APICallString)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            summonerIcon.setAttribute('src', "./assets/profileicon/" + data.profileIconId + ".png");
            summonerName.innerHTML = "<b>" + data.name + "</b>";
            summonerLevel.innerHTML = "<b>" + "Summoner Level: " + data.summonerLevel + "</b>";
        })


}

btnGetAccount.addEventListener('click', callSummonerv4);

function callChampionRotation() {
    var countLoopTable = 0;
    var APICallString = "https://na1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=" + API_KEY;

    fetch(APICallString)
        .then(function (response) {
            return response.json();
        })
        .then(function (data1) {

            freeWeekChampKey = data1.freeChampionIds;

            return fetch("./assets/champion-data/champion.json")
        }).then(function (response) {
            return response.json();
        })
        .then(function (data) {

            for (const champ in data.data) {

                for (i = 0; i < freeWeekChampKey.length; i++) {

                    if (freeWeekChampKey[i] == data.data[champ].key) {
                        countLoopTable++;
                        //YOU NEED TO ADD 
                        //freeWeekChampIcon.innerHTML = data.data[champ].name;
                        var freeWeekChampName = document.querySelector("#loln-" + countLoopTable);
                        var freeWeekChampIcon = document.getElementById("lol-" + countLoopTable);
                        console.log("test each inc is each run through" + countLoopTable);
                        freeWeekChampIcon.setAttribute('src', "./assets/champion-icon/" + champ + ".png");
                        freeWeekChampName.innerHTML = data.data[champ].name;
                        // console.log(champ);
                        // console.log("is Free Week");
                    }

                }

            }
        })


    showEffectTwo.style.display = "block";
}


btnGetFreeWeek.addEventListener('click', callChampionRotation);
