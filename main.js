(function() {
  const players = {
    yangyi: '杨倚',
    duyadi: '杜雅迪',
    sundi: '孙迪',
    sunjiaxun: '孙嘉逊',
    zengxingxin: '曾星鑫',
    liuruoran: '刘若然',
    liushan: '刘珊',
    linchen: '林晨',
    duweike: '杜维克',
  };

  const wolves = {
    normal: '普狼',
    gun: '狼枪',
    devil: '恶魔',
  };

  const goodmen = {
    villager: '村民',
    seer: '预言家',
    hunter: '猎人',
    witcher: '女巫',
    guard: '守卫',
    cupid: '丘比特',
  };

  const thirdSide = {};

  const roleSides = { wolves, goodmen, thirdSide };

  const gameData = [
    {
      date: '3 Feb',
      round: '1',
      winSide: 'wolves',
      players: [
        {
          name: players.yangyi,
          character: goodmen.seer,
        },
        {
          name: players.duyadi,
          character: wolves.normal,
        },
      ],
    },
    {
      date: '2 Feb',
      round: '3',
      winSide: 'goodmen',
      players: [
        {
          name: players.liuruoran,
          character: goodmen.seer,
        },
        {
          name: players.duyadi,
          character: wolves.normal,
        },
      ],
    },
    {
      date: '2 Feb',
      round: '1',
      winSide: 'wolves',
      players: [
        {
          name: players.yangyi,
          character: goodmen.seer,
        },
        {
          name: players.duyadi,
          character: wolves.normal,
        },
      ],
    },
    {
      date: '2 Feb',
      round: '2',
      winSide: 'goodmen',
      players: [
        {
          name: players.liuruoran,
          character: goodmen.seer,
        },
        {
          name: players.duyadi,
          character: wolves.normal,
        },
      ],
    },
  ];

  let scoreList = [];

  buildScoreList();
  $('.score-board').after(buildScoreBoard());

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

  function buildScoreBoard() {
    return scoreList
      .sort((a, b) => a.score < b.score)
      .map(
        ({ name, score }, idx) =>
          `<li class='person'><span class='person__rank'>${idx +
            1}</span><span class='person__name'>${name}</span><span class='person__score'>${score}</span></li>`
      )
      .join('');
  }

  function buildOneGameResultBoard(game) {
    const winSide = game.winSide;
    let playerInfos = game.players
      .sort((a, b) => !isPlayerWin(a.character, winSide))
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
    <div>${date.getMonth + 1}月￥{}</div>
    <div>Round ${game.round}</div>
    <ul>
      <li class="details details--header">
        <span class="details_player">Player</span>
        <span class="details_character">Character</span>
        <span class="details_result">Win/Loss</span>
      </li>
      ${playerInfos}
    </ul>`;
  }
})();
