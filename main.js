(function() {
  let scoreList = [];

  let count = 0;
  buildScoreList();
  $('.score-board').after(buildScoreBoard());
  buildGameResultDetailsBoard();
  buidlLastUpdateTime();
  handleDetailsToggleEvent();

  function buildGameResultDetailsBoard() {
    const detailsBoard = gameData
      .sort(
        (a, b) =>
          new Date(a.date) > new Date(b.date)
            ? true
            : new Date(a.date) < new Date(b.date) ? false : a.round > b.round
      )
      .map(game => buildOneGameResultBoard(game))
      .join('');
    $('.game-details').append(detailsBoard);
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
          <span class="details_character">${
            player.lover ? getHeartBlock() : ''
          }${player.character}</span>
          <span class="details_result ">${win ? 'Win' : 'Loss'}</span>
        </li>`;
      })
      .join('');

    const date = new Date(game.date);

    return `
    <div class="single-game-details">
      <div class="single-game-details-title"><b>${++count}.</b> ${date.getMonth() +
      1}月${date.getDate()}日, 第${game.round}局, 获胜方：<span class="win_${
      game.winSide
    }">${getWinText(game.winSide)}</span>
    <span class="expand-icon">
    <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" transform="rotate(90) translate(0, -24)"></path></svg>
    </span></div>
      <ul style="display:none">
        <li class="details details--header">
          <span class="details_player">玩家</span>
          <span class="details_character">角色</span>
          <span class="details_result">胜负</span>
        </li>
        ${playerInfos}
      </ul>
    </div>
    <hr />
    `;
  }

  function handleDetailsToggleEvent() {
    $('.game-details').on('click', '.single-game-details-title', function() {
      const $this = $(this);
      $this
        .parents('.single-game-details')
        .find('ul')
        .slideToggle();
    });
  }

  function getWinText(winSide) {
    const winText = {
      goodmen: '神民',
      wolves: '狼人',
      thirdSide: '第三方',
    };

    return winText[winSide];
  }

  function getHeartBlock() {
    return `<span class="heart">
      <img src="./heart.png"/>
    </span>`;
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
