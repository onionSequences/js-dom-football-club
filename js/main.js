const subBox = document.querySelector(".substitution-box");
const subBtn = document.querySelector("button");

const getData = async () => {
  try {
    const request = await fetch(
      "https://ac-milan-squad-app-default-rtdb.firebaseio.com/team.json"
    );
    return await request.json();
  } catch (error) {
    console.error(error);
  }
};

getData().then(data => {
  createHeader(data.logo);
  createMain(data);
});

const createHeader = logo => {
  const header = document.querySelector("header");
  const logoDiv = `<div class="logo"><img src="${logo}" alt="AC Milan logo"/></div>`;
  header.innerHTML = logoDiv;
};

const createEl = (type, path, cssClass) => {
  const element = document.createElement(type);

  element.textContent = path;
  cssClass ? element.classList.add(cssClass) : null;
  return element;
};

const createMain = arr => {
  const main = document.querySelector("main");
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

const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const getPlayers = team => {
  const wrapper = createEl("div", "", "wrapper");

  team.forEach(player => wrapper.append(playerCard(player)));

  return wrapper;
};

const playerCard = player => {
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

const getRandom = arr => Math.floor(Math.random() * arr.length);

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

const getSwapedPlayers = swapPlayers => {
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

const timer = () => {
  let timeleft = 60;
  let countdown = document.querySelector("progress");
  let countdownText = document.querySelector("#countdown");

  return (window.counter = setInterval(() => {
    timeleft--;
    countdown.value = timeleft;
    countdownText.innerHTML = timeleft;

    if (!timeleft) {
      timeleft = 60;
      countdown.value = timeleft;
      countdownText.innerHTML = timeleft;
      getSwapedPlayers(swapPlayers());
    }
  }, 1000));
};

subBtn.addEventListener("click", () => {
  getSwapedPlayers(swapPlayers());
  clearInterval(window.counter);
  document.querySelector("progress").value = 60;
  document.querySelector("#countdown").innerHTML = 60;
  setTimeout(() => {
    timer();
  }, 0);
});

subBox.addEventListener("click", () => {
  subBox.hasAttribute("style")
    ? subBox.removeAttribute("style")
    : (subBox.style.right = "0px");
});

timer();
