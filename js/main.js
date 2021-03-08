/*
WHAT SHOULD YOU DO ?

- Create a page displaying profiles of 15 players of your favorite football team


PAGE STRUCTURE

- Page should have a header on the top, containing team logo on the left of the header

- Below the header there should be a team name

- Below that there should be a section displaying first squad players (11 of them in total, 4 players in a row)

- Below that there should be section displaying reserve players

- Each player profile should contain image, name, last name, player number, position and age in following format:

image

Name: Ronaldinho
Last name: Gaucho
Number: 9
Position: Forward
Age: 27

- Each time page reloads random 11 players should be selected for starting squad, the rest of them should be in reserves


FOLDER STRUCTURE

- You should have main folder called FootballPlayers

- Inside of that you should have index.html file, as well as css, js and images folders


DATA STRUCTURE

- There should be an object containing team data

- It should contain team name, team logo path, and players properties

- Players property should be an array of objects

- Each object should contain single player data (Name, Last name, Number etc.)


HOW PAGE SHOULD BE CONSTRUCTED

- In the start in the HTML file you should have only container elements, like header, main section and similar elements you may need

!!! IMPORTANT !!!

- All other elements, like logo, team name, and player profiles should be added from JS, using data from existing team object


BONUS - PLAYER SUBSTITUTION :)

Each 60 seconds one random player from starting squad should be replaced with random player from reserves

*/

var teamData = {
  teamName: "AC Milan",
  logo: "./img/logo.png",
  season: "2004/2005",
  squad: [
    {
      image: "./img/1.png",
      name: "Dida",
      lastName: undefined,
      playerNumber: 12,
      position: "Goalkeeper",
      age: 47,
    },
    {
      image: "./img/2.png",
      name: "Cafú",
      lastName: undefined,
      playerNumber: 2,
      position: "Defender",
      age: 50,
    },
    {
      image: "./img/3.png",
      name: "Alessandro",
      lastName: "Nesta",
      playerNumber: 13,
      position: "Defender",
      age: 44,
    },
    {
      image: "./img/4.png",
      name: "Paolo",
      lastName: "Maldini",
      playerNumber: 3,
      position: "Defender",
      age: 52,
    },
    {
      image: "./img/5.png",
      name: "Serginho",
      lastName: undefined,
      playerNumber: 27,
      position: "Defender",
      age: 49,
    },
    {
      image: "./img/6.png",
      name: "Andrea",
      lastName: "Pirlo",
      playerNumber: 21,
      position: "Midfielder",
      age: 41,
    },
    {
      image: "./img/7.png",
      name: "Gennaro",
      lastName: "Gattuso",
      playerNumber: 8,
      position: "Midfielder",
      age: 43,
    },
    {
      image: "./img/8.png",
      name: "Clarence",
      lastName: "Seedorf",
      playerNumber: 20,
      position: "Midfielder",
      age: 44,
    },
    {
      image: "./img/9.png",
      name: "Kaká",
      lastName: undefined,
      playerNumber: 22,
      position: "Midfielder",
      age: 38,
    },
    {
      image: "./img/10.png",
      name: "Andriy",
      lastName: "Shevchenko",
      playerNumber: 7,
      position: "Forward",
      age: 44,
    },
    {
      image: "./img/11.png",
      name: "Filippo",
      lastName: "Inzaghi",
      playerNumber: 9,
      position: "Forward",
      age: 47,
    },
    {
      image: "./img/12.png",
      name: "Christian",
      lastName: "Abbiati",
      playerNumber: 77,
      position: "Goalkeeper",
      age: 43,
    },
    {
      image: "./img/13.png",
      name: "Hernán",
      lastName: "Crespo",
      playerNumber: 11,
      position: "Forward",
      age: 45,
    },
    {
      image: "./img/14.png",
      name: "Massimo",
      lastName: "Ambrosini",
      playerNumber: 23,
      position: "Midfielder",
      age: 43,
    },
    {
      image: "./img/15.png",
      name: "Jaap",
      lastName: "Stam",
      playerNumber: 31,
      position: "Defender",
      age: 48,
    },
  ],
};

function createEl(type, path, altName, cssClass) {
  var element = document.createElement(type);

  if (type === "img") {
    element.setAttribute("src", path);
    element.setAttribute("alt", altName);
    if (cssClass) {
      element.classList.add(cssClass);
    }
    return element;
  } else {
    element.textContent = path;
    element.classList.add(cssClass);
    return element;
  }
}
function createHeader() {
  var header = document.querySelector("header");
  var logoDiv = createEl("div", "", "", "logo");
  var logo = createEl("img", teamData.logo, "AC Milan logo", "");

  logoDiv.append(logo);

  header.append(logoDiv);
}

//********/ Main /************//
var headingTeamName = document.createElement("h1");
var subHeading = document.createElement("p");
var main = document.querySelector("main");
var teamName = teamData.teamName;
var seasonYear = teamData.season;
var team = teamData.squad;

// shuffle original array
shuffle(team);

// Getting last 4 players from team in reserve and others is first-squad
var reservePlayers = team.splice(11, 4);

// Adding team name to page
headingTeamName.innerText = teamName;
main.append(headingTeamName);

// Adding paragraph with season year
subHeading.classList.add("sub-heading");
subHeading.innerText = "Season " + seasonYear;
main.append(subHeading);

// Create section with heading
structureSectionAndDivs("first-squad", "First squad");

// Construction layout of cards for each player in first team
team.forEach(function (t, index) {
  createStructureForPlayersCard(t, index, "first_team");
});

// Create section with heading
structureSectionAndDivs("reserve", "Reserve players");

// Construction layout of cards for each player in reserve
reservePlayers.forEach(function (t, index) {
  createStructureForPlayersCard(t, index, "reserve_team");
});

//*******/ Functions for MAIN part /********//
function structureSectionAndDivs(sectionCssClass, innerText) {
  var section = document.createElement("section");
  var h4 = document.createElement("h4");
  var div = document.createElement("div");
  var main = document.querySelector("main");

  // Adding section with class to main
  section.className = sectionCssClass;
  main.append(section);

  // Adding header for section
  h4.innerText = innerText;
  section.append(h4);

  // Create wrapper for player cards in section
  div.className = "wrapper";
  section.append(div);
}

function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function createStructureForPlayersCard(e, index, dataTag) {
  var card = document.createElement("article");
  var playerImage = document.createElement("img");
  var div = document.createElement("div");
  var ul = document.createElement("ul");

  // Adding class to article
  card.className = "player-card";
  card.setAttribute("data-index-" + dataTag, index);

  // Adding image of player
  playerImage.setAttribute("src", e.image);
  playerImage.setAttribute("alt", e.name);
  card.append(playerImage);

  // Adding div with player info
  div.className = "info";
  div.append(ul);

  // Inner list items for informations about player
  for (var i = 0; i < 5; i++) {
    var li = document.createElement("li");
    ul.append(li);
  }

  ul.children[0].innerText = "Name: " + e.name;
  ul.children[1].innerText = e.lastName
    ? "Last name: " + e.lastName
    : "Last name: /";
  ul.children[2].innerText = "Number: " + e.playerNumber;
  ul.children[3].innerText = "Position: " + e.position;
  ul.children[4].innerText = "Age: " + e.age;

  card.append(div);

  main.lastChild.lastChild.append(card);
}

function swapPlayers(firstArr, secondArr) {
  var randomIndexFA = Math.floor(Math.random() * firstArr.length);
  var randomIndexSA = Math.floor(Math.random() * secondArr.length);

  var temp = firstArr[randomIndexFA];
  firstArr[randomIndexFA] = secondArr[randomIndexSA];
  secondArr[randomIndexSA] = temp;

  var oldFirstTeamPlayer = document.querySelector(
    "[data-index-first_team='" + randomIndexFA + "'] > .info"
  );
  var oldFirstTeamPlayerImg = document.querySelector(
    "[data-index-first_team='" + randomIndexFA + "'] > img"
  );

  var oldReserveTeamPlayer = document.querySelector(
    "[data-index-reserve_team='" + randomIndexSA + "'] > .info"
  );
  var oldReserveTeamPlayerImg = document.querySelector(
    "[data-index-reserve_team='" + randomIndexSA + "'] > img"
  );

  // set new first player
  oldFirstTeamPlayerImg.setAttribute("src", firstArr[randomIndexFA].image);
  oldFirstTeamPlayerImg.setAttribute("alt", firstArr[randomIndexFA].firstName);
  oldFirstTeamPlayer.children[0].children[0].innerText =
    "Name: " + firstArr[randomIndexFA].name;
  oldFirstTeamPlayer.children[0].children[1].innerText = firstArr[randomIndexFA]
    .lastName
    ? "Last name: " + firstArr[randomIndexFA].lastName
    : "Last name: /";
  oldFirstTeamPlayer.children[0].children[2].innerText =
    "Number: " + firstArr[randomIndexFA].playerNumber;
  oldFirstTeamPlayer.children[0].children[3].innerText =
    "Position: " + firstArr[randomIndexFA].position;
  oldFirstTeamPlayer.children[0].children[4].innerText =
    "Age: " + firstArr[randomIndexFA].age;

  // set new reserve player
  oldReserveTeamPlayerImg.setAttribute("src", secondArr[randomIndexSA].image);
  oldReserveTeamPlayerImg.setAttribute(
    "alt",
    secondArr[randomIndexSA].firstName
  );
  oldReserveTeamPlayer.children[0].children[0].innerText =
    "Name: " + secondArr[randomIndexSA].name;
  oldReserveTeamPlayer.children[0].children[1].innerText = secondArr[
    randomIndexSA
  ].lastName
    ? "Last name: " + secondArr[randomIndexSA].lastName
    : "Last name: /";
  oldReserveTeamPlayer.children[0].children[2].innerText =
    "Number: " + secondArr[randomIndexSA].playerNumber;
  oldReserveTeamPlayer.children[0].children[3].innerText =
    "Position: " + secondArr[randomIndexSA].position;
  oldReserveTeamPlayer.children[0].children[4].innerText =
    "Age: " + secondArr[randomIndexSA].age;
}

setInterval(() => {
  swapPlayers(team, reservePlayers);
}, 3000);
