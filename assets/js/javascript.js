const API_KEY = "RGAPI-12fbfd1a-4e1c-4285-994a-fc8bb918a5d8";
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
    
    freeWeekChampKey = fetch(APICallString)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        return data.freeChampionIds;
         //freeWeekChampKey = data.freeChampionIds;
         //console.log(freeWeekChampKey);
    })


    fetch("./assets/champion-data/champion.json")
    .then(function(response){
        return response.json();
    })
    .then(function(data) {

        

        for (const champ in data.data){
             console.log(champ)
             console.log(data.data[champ].key);
             console.log(freeWeekChampKey);
            var x = data.data[champ].key;
            if (freeWeekChampKey.includes(x)) {
                console.log(champ);
            }

            }
    })

}


btnGetFreeWeek.addEventListener('click', callChampionRotation);