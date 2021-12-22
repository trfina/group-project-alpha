//API_KEY Needs Regenerated every 24Hours last changed 12-22 9am
const API_KEY = "RGAPI-75df78d0-2944-4f77-a3c3-f6f589734e78";

//Variables
var btnGetAccount = document.querySelector("#getAccount");
var btnGetFreeWeek = document.querySelector("#getFreeWeek");
var showEffectOne = document.getElementById("hides1");
var showEffectTwo = document.getElementById("weekly-champs");
var inputModal = document.getElementById("modal");
var freeWeekChampKey = [];

//Setting Elements invis untill need for display
showEffectOne.style.display = "none";
showEffectTwo.style.display = "none";
inputModal.style.display = "none";

//function tied to button, fetch's and sets element properties then sets to visable
async function callSummonerv4() {
    //variables
    inputModal.style.display = "none";
    var accountName = document.getElementById("lol-username").value;
    var APICallString =
        "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
        accountName +
        "?api_key=" +
        API_KEY;
    var summonerIcon = document.querySelector("#accIcon");
    var summonerName = document.querySelector("#accName");
    var summonerLevel = document.querySelector("#accLevel");

    // Check for empty string on input box
    if (accountName !== "") {
        //fetch to get account info
        fetch(APICallString)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                //sets elements = to account info
                summonerIcon.setAttribute(
                    "src",
                    "./assets/profileicon/" + data.profileIconId + ".png"
                );
                summonerName.innerHTML = "<b>" + data.name + "</b>";
                summonerLevel.innerHTML =
                    "<b>" + "Summoner Level: " + data.summonerLevel + "</b>";
                showEffectOne.style.display = "block";
            })

            //error catch 'sets custom modal to visable, console logs and keeps account info div invis'
            .catch((error) => {
                console.log(
                    "There has been a problem with your fetch operation:",
                    error
                );
                showEffectOne.style.display = "none";
                inputModal.style.display = "block";
            });
    } else {
        //sets custom modal to visable if string was null
        inputModal.style.display = "block";
    }
}

//button that calls above function
btnGetAccount.addEventListener("click", callSummonerv4);

//Grab Free Week Characters and populates icons/name
function callChampionRotation() {
    //var to reset loop counter & the API to be Called
    var countLoopTable = 0;
    var APICallString =
        "https://na1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=" +
        API_KEY;

    //2 fetch's here first one get free characters by a array in id format adn the second one 
    //fetches the characters as objects in a json file and compares the id's to get name and image

    //API Fetch
    fetch(APICallString)
        .then(function (response) {
            return response.json();
        })
        .then(function (data1) {
            freeWeekChampKey = data1.freeChampionIds;

            //fetches objects out of the Json
            return fetch("./assets/champion-data/champion.json");
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            //loops through objects/champs in the data 
            for (const champ in data.data) {

                //for loop to compare the data to see if champ is a free week character
                for (i = 0; i < freeWeekChampKey.length; i++) {
                    if (freeWeekChampKey[i] == data.data[champ].key) {
                        countLoopTable++;

                        var freeWeekChampName = document.querySelector(
                            "#loln-" + countLoopTable
                        );

                        var freeWeekChampIcon = document.getElementById(
                            "lol-" + countLoopTable
                        );

                        //sets Character Icon
                        freeWeekChampIcon.setAttribute(
                            "src",
                            "./assets/champion-icon/" + champ + ".png"
                        );

                        //sets Character Name
                        freeWeekChampName.innerHTML = data.data[champ].name;
                    }
                }
            }
        });

    //sets freeWeek champion's to visable
    showEffectTwo.style.display = "block";
}

//button that calls above function
btnGetFreeWeek.addEventListener("click", callChampionRotation);
