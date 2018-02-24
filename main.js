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
          <span class="details_result">Win/Loss</span>
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
      <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.0" width="645" height="585" id="svg2" transform="scale(0.03) translate(-10400, -9300)">
        <defs id="defs4"></defs>
        <g id="layer1">
          <path d="M 297.29747,550.86823 C 283.52243,535.43191 249.1268,505.33855 220.86277,483.99412 C 137.11867,420.75228 125.72108,411.5999 91.719238,380.29088 C 29.03471,322.57071 2.413622,264.58086 2.5048478,185.95124 C 2.5493594,147.56739 5.1656152,132.77929 15.914734,110.15398 C 34.151433,71.768267 61.014996,43.244667 95.360052,25.799457 C 119.68545,13.443675 131.6827,7.9542046 172.30448,7.7296236 C 214.79777,7.4947896 223.74311,12.449347 248.73919,26.181459 C 279.1637,42.895777 310.47909,78.617167 316.95242,103.99205 L 320.95052,119.66445 L 330.81015,98.079942 C 386.52632,-23.892986 564.40851,-22.06811 626.31244,101.11153 C 645.95011,140.18758 648.10608,223.6247 630.69256,270.6244 C 607.97729,331.93377 565.31255,378.67493 466.68622,450.30098 C 402.0054,497.27462 328.80148,568.34684 323.70555,578.32901 C 317.79007,589.91654 323.42339,580.14491 297.29747,550.86823 z" id="path2417" style="fill:#ff0000"></path>
          <g transform="translate(129.28571,-64.285714)" id="g2221"></g>
        </g>
      </svg>
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
