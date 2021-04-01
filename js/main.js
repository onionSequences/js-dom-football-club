const teamData = {
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
const main = document.querySelector("main");
const subBox = document.querySelector(".substitution-box");
const subBtn = document.querySelector("button");
const progressBar = document.querySelector(".inner");

const createHeader = () => {
  const header = document.querySelector("header");
  const logo = `<div class="logo"><img src="${teamData.logo}" alt="AC Milan logo"/></div>`;
  header.innerHTML = logo;
};

const createEl = (type, path, cssClass) => {
  const element = document.createElement(type);

  element.textContent = path;
  cssClass ? element.classList.add(cssClass) : null;
  return element;
};

const createMain = (arr) => {
  const firstSqdSection = createEl("section", "", "first-squad");
  const reserveSqdSection = createEl("section", "", "reserve");
  const teamName = createEl("h1", arr.teamName);
  const season = createEl("p", `Season ${arr.season}`, "sub-heading");
  const reservePlayers = shuffle(arr.squad).splice(11, 4);

  main.prepend(teamName, season);

  firstSqdSection.prepend(createEl("h4", "First squad"), getPlayers(arr.squad));

  main.append(firstSqdSection);

  reserveSqdSection.prepend(
    createEl("h4", "Reserve squad"),
    getPlayers(reservePlayers)
  );

  main.append(reserveSqdSection);
};

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const getPlayers = (team) => {
  const wrapper = createEl("div", "", "wrapper");

  team.forEach((player) => wrapper.append(playerCard(player)));

  return wrapper;
};

const playerCard = (player) => {
  const card = createEl("article", "", "player-card");
  const image = `<img src="${player.image}" alt="${player.name}"/>`;
  const cardInfo = createEl("div", "", "info");
  const firstName = createEl("p", `Name: ${player.name}`);
  const lastName = createEl("p", `Last name: ${player.lastName}`);
  const playerNumber = createEl("p", `Number: ${player.playerNumber}`);
  const position = createEl("p", `Position: ${player.position}`);
  const age = createEl("p", `Age: ${player.age}`);

  card.innerHTML = image;

  cardInfo.prepend(firstName, lastName, playerNumber, position, age);

  card.append(cardInfo);
  return card;
};

const getRandom = (arr) => Math.floor(Math.random() * arr.length);

//Change players
const swapPlayers = () => {
  const firstSqdPlayers = document.querySelectorAll(".first-squad div article");
  const reserve = document.querySelectorAll(".reserve div article");

  let firstPlayer = firstSqdPlayers[getRandom(firstSqdPlayers)];
  let reservePlayer = reserve[getRandom(reserve)];

  let previousReservePlayer = reservePlayer.previousSibling;
  let nextReservePlayer = reservePlayer.nextSibling;

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

  return [firstPlayer, reservePlayer];
};

const getSwapedPlayers = (swapPlayers) => {
  const substitutionIn = document.querySelector("div.in > p");
  const substitutionOut = document.querySelector("div.out > p");
  let [outPlayer, inPlayer] = swapPlayers;

  substitutionOut.innerHTML =
    outPlayer.lastChild.childNodes[2].innerHTML.slice(7) +
    outPlayer.lastChild.firstChild.innerHTML.slice(5);
  substitutionIn.innerHTML =
    inPlayer.lastChild.childNodes[2].innerHTML.slice(7) +
    inPlayer.lastChild.firstChild.innerHTML.slice(5);
};

subBtn.addEventListener("click", () => {
  progressBar.removeAttribute("class");
  clearInterval(window.subTimer);
  getSwapedPlayers(swapPlayers());

  setTimeout(() => {
    timer();
    progressBar.setAttribute("class", "inner");
  }, 1);
});

const timer = () => {
  const nextSubTime = document.querySelector(
    ".substitution-timer > p:nth-child(2)"
  );
  let startTime = 60;

  nextSubTime.innerHTML = `${startTime}s`;

  window.subTimer = setInterval(() => {
    startTime === 1 ? (startTime = 60) : startTime--;

    nextSubTime.innerHTML = `${startTime}s`;
  }, 1000);
};

subBox.addEventListener("click", () => {
  subBox.hasAttribute("style")
    ? subBox.removeAttribute("style")
    : (subBox.style.right = "0px");
});

createHeader();
createMain(teamData);
timer();
setInterval(() => {
  getSwapedPlayers(swapPlayers());
}, 60000);
