(function() {
  let scoreList = [];

  let sortParamers = {
    primary: 'score',
    secondery: 'count',
    reverse: false,
    secondReverse: false,
  };

  let count = 0;
  dupFixHeader();
  buildScoreList();
  $('.score-board').after(buildScoreBoard());
  $('.board-container').append(buildScoreNames());
  buildGameResultDetailsBoard();
  buidlLastUpdateTime();
  handleDetailsToggleEvent();
  handleScrollEvent();

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
        const isWin = isPlayerWin(player.character, winSide);
        if (isWin) {
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

        increaseCharacterCount(playerInScoreList, player.character, isWin);

        const {
          name,
          score,
          count,
          wolfCount,
          wolfWinCount,
          goodmanCount,
          goodmanWinCount,
          seerCount,
          seerWinCount,
          witcherCount,
          witcherWinCount,
          hunterCount,
          hunterWinCount,
          guardCount,
          guardWinCount,
          cupidCount,
          cupidWinCount,
          idiotCount,
          idiotWinCount,
          villagerCount,
          villagerWinCount,
        } = playerInScoreList;

        const rate = score / count;
        const wolfRate = wolfCount ? wolfWinCount / wolfCount : -1;
        const goodmanRate = goodmanCount ? goodmanWinCount / goodmanCount : -1;

        const pickWolfRate = wolfCount / count;

        const villagerRate = villagerCount
          ? rawNumber(villagerWinCount) / rawNumber(villagerCount)
          : -1;
        const seerRate = seerCount
          ? rawNumber(seerWinCount) / rawNumber(seerCount)
          : -1;

        const witcherRate = witcherCount
          ? rawNumber(witcherWinCount) / rawNumber(witcherCount)
          : -1;

        const hunterRate = hunterCount
          ? rawNumber(hunterWinCount) / rawNumber(hunterCount)
          : -1;

        const guardRate = guardCount
          ? rawNumber(guardWinCount) / rawNumber(guardCount)
          : -1;

        const idiotRate = idiotCount
          ? rawNumber(idiotWinCount) / rawNumber(idiotCount)
          : -1;

        playerInScoreList = {
          ...playerInScoreList,
          rate,
          wolfRate,
          goodmanRate,
          pickWolfRate,
          villagerRate,
          seerRate,
          witcherRate,
          hunterRate,
          guardRate,
          idiotRate,
        };

        replacePlayerInData(playerInScoreList);
      });
    });
  }

  function increaseCharacterCount(playerInScoreList, character, isWin) {
    let key;

    let index = Object.values(goodmen).indexOf(character);
    if (index >= 0) {
      key = Object.keys(goodmen)[index];
    }

    index = Object.values(wolves).indexOf(character);
    if (index >= 0) {
      key = Object.keys(wolves);
    }

    playerInScoreList[`${key}Count`] = playerInScoreList[`${key}Count`]
      ? playerInScoreList[`${key}Count`] + 1
      : 1;
    if (isWin) {
      playerInScoreList[`${key}WinCount`] = playerInScoreList[`${key}WinCount`]
        ? playerInScoreList[`${key}WinCount`] + 1
        : 1;
    }
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

  function replacePlayerInData(playerInScoreList) {
    scoreList = scoreList.filter(
      player => player.name !== playerInScoreList.name
    );
    scoreList.push(playerInScoreList);
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

  function sortScoreList() {
    const { primary, reverse, secondery, secondReverse } = sortParamers;

    return scoreList.filter(a => a.score > 0).sort((a, b) => {
      let compare = b[primary] - a[primary];
      compare = reverse ? -compare : compare;

      if (compare === 0 && secondery) {
        compare = b[secondery] - a[secondery];
        compare = secondReverse ? -compare : compare;
      }
      return compare;
    });
    // return scoreList.filter(a => a.score > 0).sort((a, b) => {
    //   let compare = b.score - a.score;
    //   if (compare === 0) {
    //     compare = b.count - a.count;
    //   }
    //   return compare;
    // });
  }

  function buildScoreBoard() {
    return sortScoreList()
      .map((playerInScoreList, idx) => {
        const {
          name,
          score,
          count,
          wolfCount,
          wolfWinCount,
          goodmanCount,
          goodmanWinCount,
          seerCount,
          seerWinCount,
          witcherCount,
          witcherWinCount,
          hunterCount,
          hunterWinCount,
          guardCount,
          guardWinCount,
          cupidCount,
          cupidWinCount,
          idiotCount,
          idiotWinCount,
          villagerCount,
          villagerWinCount,
          rate,
          wolfRate,
          goodmanRate,
          pickWolfRate,
          villagerRate,
          seerRate,
          witcherRate,
          hunterRate,
          guardRate,
          idiotRate,
        } = playerInScoreList;

        return `<li class='person'><span class='person__rank'>${idx +
          1}</span><span class='person__name'>${name}</span>
            <span class='person__score'>${score}</span>
            <span class='person__result'>${count}</span>
            <span class='person__result'>${percentString(rate)}</span>
            <span class='person__result'>${wolfWinCount}/${wolfCount}</span>
            <span class='person__result'>
            ${percentString(wolfRate)}
            </span>
            <span class='person__result'>${percentString(pickWolfRate)}</span>

            <span class='person__result'>${rawNumber(
              goodmanWinCount
            )}/${rawNumber(goodmanCount)}</span>
            <span class='person__result'>${percentString(goodmanRate)}</span>
            <span class='person__result'>${rawNumber(
              villagerWinCount
            )}/${rawNumber(villagerCount)}</span>
            <span class='person__result'>${percentString(villagerRate)}</span>

            <span class='person__result large'>${rawNumber(
              seerWinCount
            )}/${rawNumber(seerCount)}</span>
            <span class='person__result large'>${percentString(seerRate)}</span>
            <span class='person__result'>${rawNumber(
              witcherWinCount
            )}/${rawNumber(witcherCount)}</span>
            <span class='person__result'>${percentString(witcherRate)}</span>
            <span class='person__result'>${rawNumber(
              hunterWinCount
            )}/${rawNumber(hunterCount)}</span>
            <span class='person__result'>${percentString(hunterRate)}</span>
            <span class='person__result'>${rawNumber(
              guardWinCount
            )}/${rawNumber(guardCount)}</span>
            <span class='person__result'>${percentString(guardRate)}</span>
            <span class='person__result'>${rawNumber(
              idiotWinCount
            )}/${rawNumber(idiotCount)}</span>
            <span class='person__result'>${percentString(idiotRate)}</span>
            </li>`;
      })
      .join('');
  }

  function rawNumber(number) {
    return number ? number : 0;
  }

  function percentString(rate) {
    return rate < 0 ? '0' : `${(rate * 100).toFixed(2)}%`;
  }

  function buildScoreNames() {
    const names = sortScoreList()
      .map(({ name }, idx) => {
        return `<li class='person'><span class='person__name'>${name}</span>
            </li>`;
      })
      .join('');

    return `
    <ul class="hide-name">
      <li class="person person--header">
        <span class="person__name">玩家</span>
      </li>
      ${names}
    </ul>`;
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

  function handleScrollEvent() {
    $('.person-ul').scroll(event => {
      if (event.target.scrollLeft > 50) {
        $('.hide-name').show();
        $('.header-person-name').show();
      } else {
        $('.hide-name').hide();
        $('.header-person-name').hide();
      }
    });
  }

  function dupFixHeader() {
    const $personUl = $('.person-ul');
    const $fixHeader = $($personUl[0].outerHTML);

    $fixHeader.append(`
      <div class="header-person-name person" >
        <span>玩家</span>
      </div>
      `);

    $fixHeader
      .removeClass('person-ul')
      .addClass('fix-header')
      .find('.score-board')
      .removeClass('score-board');
    $fixHeader.css('width', $personUl.width());

    $('.board-container').append($fixHeader);

    function scrollFixHeader() {
      $fixHeader.find('li').css('margin-left', 0 - $personUl.scrollLeft());
    }

    $(window).scroll(() => {
      const rect = $('.person-ul')[0].getBoundingClientRect();

      if (rect.y < 0 && rect.y + rect.height > 57) {
        $fixHeader.show();
        $personUl.on('scroll', scrollFixHeader);
        scrollFixHeader();
      } else {
        $personUl.off('scroll', scrollFixHeader);
        $fixHeader.hide();
      }
    });
  }

  function dupFixHeader() {
    const $personUl = $('.person-ul');
    const $fixHeader = $($personUl[0].outerHTML);

    $fixHeader.append(`
      <div class="header-person-name person" >
        <span>玩家</span>
      </div>
      `);

    $fixHeader
      .removeClass('person-ul')
      .addClass('fix-header')
      .find('.score-board')
      .removeClass('score-board');
    $fixHeader.css('width', $personUl.css('width'));

    $('.board-container').prepend($fixHeader);

    function scrollFixHeader() {
      $fixHeader.find('li').css('margin-left', 0 - $personUl.scrollLeft());
    }

    function windowScroll() {
      const offset = $('.person-ul').offset();
      const height = $('.person-ul').height();
      const scrollTop = $(window).scrollTop();
      if (scrollTop > offset.top && scrollTop < offset.top + height - 50) {
        $fixHeader.show();

        $fixHeader.css('margin-top', scrollTop - offset.top);
        $personUl.on('scroll', scrollFixHeader);
        scrollFixHeader();
      } else {
        $personUl.off('scroll', scrollFixHeader);
        $fixHeader.hide();
      }
    }

    $(document.body).on('touchmove', windowScroll);
    $(window).on('scroll', windowScroll);
  }
})();
