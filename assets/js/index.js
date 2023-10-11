window.addEventListener("DOMContentLoaded", () => {
  // const addBtn = document.getElementById("add-btn");
  // const removeBtn = document.querySelector("#remove-btn");
  // const countText = document.querySelector("h2 span");
  // const allButtons = document.getElementsByClassName("btn"); // querySelectorAll(".btn")

  // addBtn.addEventListener("click", () => {
  //   countText.textContent = Number(countText.textContent) + 1;
  // });

  // removeBtn.addEventListener("click", () => {
  //   countText.textContent = Number(countText.textContent) - 1;
  // });

  const input1 = document.querySelector("#input-1");
  const input2 = document.querySelector("#input-2");
  const startBtn = document.getElementById("start-btn");
  const introContainer = document.querySelector("#intro-game-container");

  let player1;
  let player2;

  const win = (winner) => {
    introContainer.innerHTML = "";

    const winTitle = document.createElement("h1");
    winTitle.textContent = `ha ganado ${winner}`;

    introContainer.appendChild(winTitle);
  };

  const updateStatus = () => {
    const soldier1Life = document.querySelector("#soldier-1-life");
    const soldier2Life = document.querySelector("#soldier-2-life");

    if (player1.health <= 0 || player2.health <= 0) {
      if (player1.health <= 0) {
        soldier1Life.textContent = "ha palmado";
        win("Player 2");
      }

      if (player2.health <= 0) {
        soldier2Life.textContent = "ha palmado";
        win("Player 1");
      }
    } else {
      soldier1Life.textContent = player1.health;
      soldier2Life.textContent = player2.health;
    }
  };

  const createSoldier = (player) => {
    const soldierCard = document.createElement("div");
    soldierCard.classList.add("soldier-card");
    soldierCard.id = `soldier-${player.numPlayer}-card`;

    // <div class="soldier-card" id="soldier-N-card">
    // </div>

    const attackButton = document.createElement("button");
    attackButton.textContent = "ATACA!";

    attackButton.addEventListener("click", () => {
      if (player.numPlayer === 1) {
        player2.receiveDamage(player1.attack());
      } else {
        player1.receiveDamage(player2.attack());
      }

      updateStatus();
    });

    // <button onClick={ () => ....}>ATACA!</button>

    const soldierImg = document.createElement("img");
    soldierImg.src = `./assets/img/soldier-${player.numPlayer}.png`;

    // <img src="`./assets/img/soldier-N.png`;">

    const soldierName = document.createElement("h2");
    soldierName.textContent = `${player.name} - Player ${player.numPlayer}`;

    // <h2>NAME - Player N</h2>

    const soldierLife = document.createElement("h3");
    soldierLife.id = `soldier-${player.numPlayer}-life`;
    soldierLife.textContent = player.health;

    // <h3 id="soldier-N-life">100</h3>

    soldierCard.appendChild(soldierImg);
    soldierCard.appendChild(soldierName);
    soldierCard.appendChild(soldierLife);
    soldierCard.appendChild(attackButton);

    // soldierCard
    // ____________________
    //
    // <div class="soldier-card" id="soldier-N-card">
    //   <img src="`./assets/img/soldier-N.png`;">
    //   <h2>NAME - Player N</h2>
    //   <h3 id="soldier-N-life">100</h3>
    //   <button onClick={ () => ....}>ATACA!</button>
    // </div>
    //_____________________

    return soldierCard;
  };

  const createBoard = () => {
    introContainer.innerHTML = "";
    introContainer.classList.add("d-flex");

    introContainer.appendChild(createSoldier(player1));
    introContainer.appendChild(createSoldier(player2));
  };

  startBtn.addEventListener("click", () => {
    if (input1.value && input2.value) {
      player1 = new Soldier(input1.value, 1);
      player2 = new Soldier(input2.value, 2);

      createBoard();
    } else {
      const errorMessage = document.querySelector(
        "#intro-game-container .error-msg"
      );

      if (!errorMessage) {
        const paragraph = document.createElement("p"); // <p></p>
        paragraph.classList.add("error-msg");
        paragraph.classList.add("mt-4");
        paragraph.classList.add("text-danger");
        paragraph.textContent = "Hey! falta algo por completar!"; // <p>Hey! falta algo por completar!</p>

        introContainer.appendChild(paragraph);
      }
    }
  });
});
