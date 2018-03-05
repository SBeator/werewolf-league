(function() {
  function validateMap(data) {
    const keys = Object.keys(data);
    const isKeyOK = checkIfArrayIsUnique(keys);

    console.assert(isKeyOK, 'Keys is not OK:');

    const values = Object.values(data);
    const isValueOK = checkIfArrayIsUnique(values);

    console.assert(isValueOK, 'Values is not OK:');
  }

  function checkIfArrayIsUnique(array) {
    return array.length === new Set(array).size;
  }

  function validateDate(dateString) {
    const date = new Date(dateString);
    console.assert(date != 'Invalid Date', 'Data is not valid');
  }

  function validateWinSide(winSide) {
    console.assert(roleSides[winSide], 'winSide is not correct');
  }

  function validatePlayers(players) {
    const names = players.map(player => player.name);
    const namesAreUnique = checkIfArrayIsUnique(names);
    console.assert(namesAreUnique, 'Names are not unique');
  }

  function validateGameData(data) {
    gameData.forEach(data => {
      validateDate(data.date);
      validateWinSide(data.winSide);
      validatePlayers(data.players);
    });
  }

  validateMap(players);
  validateMap(wolves);
  validateMap(goodmen);
  validateMap(thirdSide);
  validateGameData(gameData);
})();
