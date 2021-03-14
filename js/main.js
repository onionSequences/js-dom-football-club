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
      lastName: "/",
      playerNumber: 12,
      position: "Goalkeeper",
      age: 47,
    },
    {
      image: "./img/2.png",
      name: "Cafú",
      lastName: "/",
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
      lastName: "/",
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
      lastName: "/",
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
var main = document.querySelector("main");

function createHeader() {
  var header = document.querySelector("header");
  var logo =
    '<div class="logo"><img src="' +
    teamData.logo +
    '" alt="AC Milan logo"/></div>';
  header.innerHTML = logo;
}

function createEl(type, path, cssClass) {
  var element = document.createElement(type);

  element.textContent = path;
  if (cssClass) {
    element.classList.add(cssClass);
  }
  return element;
}

function createMain(arr) {
  var firstSqdSection = createEl("section", "", "first-squad");
  var reserveSqdSection = createEl("section", "", "reserve");
  var teamName = createEl("h1", arr.teamName);
  var season = createEl("p", "Season " + arr.season, "sub-heading");
  var reservePlayers = shuffle(arr.squad).splice(11, 4);

  main.prepend(teamName, season);

  firstSqdSection.prepend(createEl("h4", "First squad"), getPlayers(arr.squad));

  main.append(firstSqdSection);

  reserveSqdSection.prepend(
    createEl("h4", "Reserve squad"),
    getPlayers(reservePlayers)
  );

  main.append(reserveSqdSection);
}

function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getPlayers(team) {
  var wrapper = createEl("div", "", "wrapper");

  team.forEach(function (player) {
    wrapper.append(playerCard(player));
  });

  return wrapper;
}

function playerCard(player) {
  var card = createEl("article", "", "player-card");
  var image = '<img src="' + player.image + '" alt="' + player.name + '"/>';
  var cardInfo = createEl("div", "", "info");
  var firstName = createEl("p", "Name: " + player.name);
  var lastName = createEl("p", "Last name: " + player.lastName);
  var playerNumber = createEl("p", "Number: " + player.playerNumber);
  var position = createEl("p", "Position: " + player.position);
  var age = createEl("p", "Age: " + player.age);

  card.innerHTML = image;

  cardInfo.prepend(firstName, lastName, playerNumber, position, age);

  card.append(cardInfo);
  return card;
}
function getRandom(arr) {
  return Math.floor(Math.random() * arr.length);
}
//Change players
function swapPlayers() {
  var firstSqdPlayers = document.querySelectorAll(".first-squad div article");
  var reserve = document.querySelectorAll(".reserve div article");

  var firstPlayer = firstSqdPlayers[getRandom(firstSqdPlayers)];
  var reservePlayer = reserve[getRandom(reserve)];

  var previousReservePlayer = reservePlayer.previousSibling;
  var nextReservePlayer = reservePlayer.nextSibling;

  firstPlayer.classList.toggle("red-border");
  reservePlayer.classList.toggle("green-border");
  setTimeout(() => {
    firstPlayer.classList.toggle("red-border");
    reservePlayer.classList.toggle("green-border");
  }, 4000);
  firstPlayer.before(reservePlayer);
  previousReservePlayer
    ? previousReservePlayer.after(firstPlayer)
    : nextReservePlayer.before(firstPlayer);
}
createHeader();
createMain(teamData);
setInterval(swapPlayers, 5000);
