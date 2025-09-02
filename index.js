/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // safety log (you already added something similar—keep whichever you like)
  console.log("addGamesToPage called", Array.isArray(games), games?.length);

  // loop over each item in the data
  for (const game of games) {
    // create a new div element, which will become the game card
    const gameCard = document.createElement("div");

    // add the class game-card to the list
    gameCard.classList.add("game-card");

    // set the inner HTML using a template literal to display info about each game
    // (adjust property names to match your games.js if needed)
    gameCard.innerHTML = `
      <img class="game-img" src="${game.img}" alt="${game.name}" />
      <h3>${game.name}</h3>
      <p>${game.description}</p>
      <p><strong>Pledged:</strong> $${Number(game.pledged).toLocaleString()}</p>
      <p><strong>Goal:</strong> $${Number(game.goal).toLocaleString()}</p>
      <p><strong>Backers:</strong> ${Number(game.backers).toLocaleString()}</p>
    `;

    // append the game to the games-container
    gamesContainer.appendChild(gameCard);
  }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, g) => acc + g.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, g) => acc + g.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length.toLocaleString()}`;


/*************************************************************************************
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);
  const unfunded = GAMES_JSON.filter(g => g.pledged < g.goal);
  addGamesToPage(unfunded);
}

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);
  const funded = GAMES_JSON.filter(g => g.pledged >= g.goal);
  addGamesToPage(funded);
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);
  addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn   = document.getElementById("funded-btn");
const allBtn      = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click",   filterFundedOnly);
allBtn.addEventListener("click",      showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numUnfunded = GAMES_JSON.filter(g => g.pledged < g.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const descStr = `A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games. Currently, ${numUnfunded} ${numUnfunded === 1 ? "game remains unfunded" : "games remain unfunded"}.`;

// create a new DOM element containing the template string and append it to the description container
const descP = document.createElement("p");
descP.textContent = descStr;
descriptionContainer.appendChild(descP);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer  = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.slice().sort((a, b) => b.pledged - a.pledged);

// use destructuring and the spread operator to grab the first and second games
const [topGame, secondGame, ...rest] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topNameEl = document.createElement("h3");
topNameEl.textContent = topGame.name;
firstGameContainer.appendChild(topNameEl);

// do the same for the runner up item
const secondNameEl = document.createElement("h3");
secondNameEl.textContent = secondGame.name;
secondGameContainer.appendChild(secondNameEl);
