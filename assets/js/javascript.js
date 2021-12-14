
// old api key const API_KEY = "RGAPI-2227c53f-77f9-44df-b194-43551ad47f54";
const API_KEY = "RGAPI-dc57702d-9832-4a9c-b3c5-2f5585d893c0";

var btnGetAccount = document.querySelector("#getAccount");
var btnGetFreeWeek = document.querySelector("#getFreeWeek");
var freeWeekChampKey = [];

async function callSummonerv4() {
    var accountName = document.getElementById("lol-username").value;
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
    var APICallString = "https://na1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=" + API_KEY;
    
     fetch(APICallString)
    .then(function(response){
        return response.json();
    })
    .then(function(data1) {

        freeWeekChampKey = data1.freeChampionIds;

          return   fetch("./assets/champion-data/champion.json")
    }) .then(function(response){
        return response.json();
    })
     .then(function(data) {

        for (const champ in data.data){

             for (i = 0; i < freeWeekChampKey.length; i++) {

                if (freeWeekChampKey[i] == data.data[champ].key)  {
                    console.log(champ);
                    console.log("is Free Week");
                }

             }

            }
    }) 



}


btnGetFreeWeek.addEventListener('click', callChampionRotation);