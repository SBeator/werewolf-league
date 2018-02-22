(function() {
  let scoreList = [];

  let count = 0;
  buildScoreList();
  $('.score-board').after(buildScoreBoard());
  buildGameResultDetailsBoard();
  buidlLastUpdateTime();

  function buildGameResultDetailsBoard() {
    const detailsBoard = gameData
      .sort(
        (a, b) =>
          new Date(a.date) < new Date(b.date)
            ? true
            : new Date(a.date) > new Date(b.date) ? false : a.round > b.round
      )
      .map(game => buildOneGameResultBoard(game))
      .join('');
    $('.game-details').after(detailsBoard);
  }

  function buildScoreList() {
    gameData.forEach(game => {
      const winSide = game.winSide;
      game.players.forEach(player => {
        if (isPlayerWin(player.character, winSide)) {
          const playerInScoreList = getPlayerInData(player.name);
          if (playerInScoreList) {
            playerInScoreList.score++;
          } else {
            scoreList.push({
              name: player.name,
              score: 1,
            });
          }
        }
      });
    });
  }

  function isPlayerWin(character, winSide) {
    return Object.values(roleSides[winSide]).indexOf(character) >= 0;
  }

  function getPlayerInData(playerName) {
    return scoreList.find(player => player.name == playerName);
  }

  function getCharacterIndex(character) {
    let characterIndex = -1;
    let characterSide = -1;
    for (let [side, roles] of Object.entries(roleSides)) {
      characterIndex = Object.values(roles).indexOf(character);
      if (characterIndex >= 0) {
        characterSide = Object.keys(roleSides).indexOf(side);
        break;
      }
    }

    return {
      side: characterSide,
      index: characterIndex,
    };
  }

  function buildScoreBoard() {
    return scoreList
      .sort((a, b) => b.score - a.score)
      .map(
        ({ name, score }, idx) =>
          `<li class='person'><span class='person__rank'>${idx +
            1}</span><span class='person__name'>${name}</span><span class='person__score'>${score}</span></li>`
      )
      .join('');
  }

  function buildOneGameResultBoard(game) {
    const winSide = game.winSide;
    let playerInfos = game.players.sort((a, b) => {
      const aCharaterInfo = getCharacterIndex(a.character);
      const bCharaterInfo = getCharacterIndex(b.character);

      let compare = aCharaterInfo.side - bCharaterInfo.side;
      if (compare === 0) {
        compare = aCharaterInfo.index - bCharaterInfo.index;
      }
      return compare;
    });

    playerInfos = playerInfos
      .map(player => {
        const win = isPlayerWin(player.character, winSide);

        return `<li class="details details_${win ? 'win' : 'loss'}">
          <span class="details_player">${player.name}</span>
          <span class="details_character">${player.character}</span>
          <span class="details_result ">${win ? 'Win' : 'Loss'}</span>
        </li>`;
      })
      .join('');

    const date = new Date(game.date);

    return `
    <div>#${++count}</div>
    <div>${date.getMonth() + 1}月${date.getDate()}日</div>
    <div>Round ${game.round}</div>
    <ul>
      <li class="details details--header">
        <span class="details_player">Player</span>
        <span class="details_character">Character</span>
        <span class="details_result">Win/Loss</span>
      </li>
      ${playerInfos}
    </ul>
    <hr />
    `;
  }

  function buidlLastUpdateTime() {
    const maxDate = gameData
      .map(game => new Date(game.date))
      .reduce(
        (lastData, currectDate) =>
          lastData > currectDate ? lastData : currectDate,
        0
      );

    $('.league__info').text(
      `最后更新： ${maxDate.getMonth() + 1}月${maxDate.getDate()}日`
    );
  }
})();
