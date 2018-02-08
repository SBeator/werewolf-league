(function () {
  const data = [
    { name: '杨倚', score: 1 },
    { name: '杜雅迪', score: 1 },
    { name: '孙迪', score: 2 },
    { name: '孙嘉逊', score: 1 },
    { name: '曾星鑫', score: 1 },
    { name: '刘若然', score: 1 },
    { name: '刘珊', score: 1 },
    { name: '林晨', score: 1 },
    { name: '杜维克', score: 1 },
  ];
  const lists = data.sort((a, b) => a.score < b.score)
    .map(({ name, score }, idx) =>
      `<li class='person'><span class='person__rank'>${idx+1}</span><span class='person__name'>${name}</span><span class='person__score'>${score}</span></li>`
    ).join('');
  $('.person--header').after(lists);
}())