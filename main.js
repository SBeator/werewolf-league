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
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        const aLarger = dateA > dateB;
        const bLarger = dateA < dateB;

        return aLarger ? 1 : bLarger ? -1 : a.round - b.round;
      })
      .map(game => buildOneGameResultBoard(game))
      .join('');
    $('.game-details').append(detailsBoard);
  }

  function buildScoreList() {
    gameData.forEach(game => {
      const winSide = game.winSide;
      game.players.forEach(player => {
        let playerInScoreList = getPlayerInData(player.name);

        if (!playerInScoreList) {
          playerInScoreList = {
            name: player.name,
            score: 0,
            count: 0,
            wolfCount: 0,
            wolfWinCount: 0,
            goodmanCount: 0,
            goodmanWinCount: 0,
          };
          scoreList.push(playerInScoreList);
        }

        playerInScoreList.count++;
        if (isPlayerWin(player.character, winSide)) {
          playerInScoreList.score++;

          if (isWolf(player.character)) {
            playerInScoreList.wolfWinCount++;
          }

          if (isGoodman(player.character)) {
            playerInScoreList.goodmanWinCount++;
          }
        }

        if (isWolf(player.character)) {
          playerInScoreList.wolfCount++;
        }

        if (isGoodman(player.character)) {
          playerInScoreList.goodmanCount++;
        }
      });
    });
  }

  function isPlayerWin(character, winSide) {
    return Object.values(roleSides[winSide]).indexOf(character) >= 0;
  }

  function isWolf(character) {
    return Object.values(roleSides.wolves).indexOf(character) >= 0;
  }

  function isGoodman(character) {
    return Object.values(roleSides.goodmen).indexOf(character) >= 0;
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
      .filter(a => a.score > 0)
      .sort((a, b) => {
        let compare = b.score - a.score;
        if (compare === 0) {
          compare = b.count - a.count;
        }
        return compare;
      })
      .map(
        (
          {
            name,
            score,
            count,
            wolfCount,
            wolfWinCount,
            goodmanCount,
            goodmanWinCount,
          },
          idx
        ) => {
          const rate = (score / count * 100).toFixed(2);
          return `<li class='person'><span class='person__rank'>${idx +
            1}</span><span class='person__name'>${name}</span>
            <span class='person__score'>${score}</span>
            <span class='person__rate'>${rate}%</span>
            <span class=''>${wolfWinCount}/${wolfCount}|</span>
            <span class=''>${(wolfWinCount / wolfCount * 100).toFixed(
              2
            )}%|</span>
            <span class=''>${goodmanWinCount}/${goodmanCount}|</span>
            <span class=''>${(goodmanWinCount / goodmanCount * 100).toFixed(
              2
            )}%</span>
            </li>`;
        }
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
