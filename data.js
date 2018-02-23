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
  xiaozihang: '夏梓航',
  yuyang: '喻杨',
  zenglei: '曾磊',
  liucong: '刘聪',
  wangpei: '王培',
  hewei: '何蔚',
  zhipu: '支朴',
  linning: '林宁',
  liaoguolong: '廖国龙',
};

const wolves = {
  gun: '狼枪',
  devil: '恶魔',
  invisibility: '隐狼',
  normal: '普狼',
};

const goodmen = {
  seer: '预言家',
  witcher: '女巫',
  hunter: '猎人',
  guard: '守卫',
  cupid: '丘比特',
  idiot: '白痴',
  villager: '村民',
};

const thirdSide = {};

const roleSides = { thirdSide, wolves, goodmen };

const gameData = [
  {
    date: '11 Feb 2018',
    round: '1',
    winSide: 'wolves',
    players: [
      {
        name: players.linning,
        character: goodmen.seer,
      },
      {
        name: players.duyadi,
        character: goodmen.hunter,
      },
      {
        name: players.zhipu,
        character: goodmen.witcher,
      },
      {
        name: players.liushan,
        character: goodmen.idiot,
      },
      {
        name: players.liuruoran,
        character: goodmen.villager,
      },
      {
        name: players.zengxingxin,
        character: goodmen.villager,
      },
      {
        name: players.liaoguolong,
        character: goodmen.villager,
      },
      {
        name: players.liucong,
        character: goodmen.villager,
      },
      {
        name: players.linchen,
        character: wolves.normal,
      },
      {
        name: players.zenglei,
        character: wolves.invisibility,
      },
      {
        name: players.duweike,
        character: wolves.normal,
      },
      {
        name: players.sundi,
        character: wolves.normal,
      },
    ],
  },
  {
    date: '11 Feb 2018',
    round: '2',
    winSide: 'goodmen',
    players: [
      {
        name: players.duweike,
        character: goodmen.seer,
      },
      {
        name: players.zhipu,
        character: goodmen.hunter,
      },
      {
        name: players.duyadi,
        character: goodmen.witcher,
      },
      {
        name: players.linning,
        character: goodmen.villager,
      },
      {
        name: players.liaoguolong,
        character: goodmen.villager,
      },
      {
        name: players.liuruoran,
        character: wolves.normal,
      },
      {
        name: players.zenglei,
        character: wolves.normal,
      },
      {
        name: players.liushan,
        character: wolves.normal,
      },
    ],
  },
  {
    date: '11 Feb 2018',
    round: '3',
    winSide: 'wolves',
    players: [
      {
        name: players.zhipu,
        character: goodmen.seer,
      },
      {
        name: players.linning,
        character: goodmen.hunter,
      },
      {
        name: players.zenglei,
        character: goodmen.witcher,
      },
      {
        name: players.liuruoran,
        character: goodmen.villager,
      },
      {
        name: players.duweike,
        character: goodmen.villager,
      },
      {
        name: players.liushan,
        character: wolves.normal,
      },
      {
        name: players.liaoguolong,
        character: wolves.normal,
      },
      {
        name: players.duyadi,
        character: wolves.normal,
      },
    ],
  },
  {
    date: '9 Feb 2018',
    round: '1',
    winSide: 'wolves',
    players: [
      {
        name: players.xiaozihang,
        character: wolves.normal,
      },
      {
        name: players.zengxingxin,
        character: wolves.normal,
      },
      {
        name: players.sundi,
        character: wolves.normal,
      },
      {
        name: players.yuyang,
        character: wolves.devil,
      },
      {
        name: players.yangyi,
        character: goodmen.seer,
      },
      {
        name: players.liushan,
        character: goodmen.guard,
      },
      {
        name: players.liuruoran,
        character: goodmen.hunter,
      },
      {
        name: players.duweike,
        character: goodmen.villager,
      },
      {
        name: players.zenglei,
        character: goodmen.villager,
      },
      {
        name: players.zhipu,
        character: goodmen.witcher,
      },
      {
        name: players.duyadi,
        character: goodmen.villager,
      },
      {
        name: players.linchen,
        character: goodmen.villager,
      },
    ],
  },
  {
    date: '9 Feb 2018',
    round: '2',
    winSide: 'goodmen',
    players: [
      {
        name: players.zengxingxin,
        character: goodmen.seer,
      },
      {
        name: players.liushan,
        character: goodmen.hunter,
      },
      {
        name: players.linchen,
        character: goodmen.witcher,
      },
      {
        name: players.liuruoran,
        character: goodmen.villager,
      },
      {
        name: players.duweike,
        character: goodmen.villager,
      },
      {
        name: players.zenglei,
        character: goodmen.villager,
      },
      {
        name: players.sundi,
        character: wolves.normal,
      },
      {
        name: players.yangyi,
        character: wolves.normal,
      },
    ],
  },
  {
    date: '2 Feb 2018',
    round: '1',
    winSide: 'wolves',
    players: [
      {
        name: players.yangyi,
        character: wolves.normal,
      },
      {
        name: players.duyadi,
        character: wolves.gun,
      },
      {
        name: players.sundi,
        character: wolves.normal,
      },
      {
        name: players.sunjiaxun,
        character: wolves.normal,
      },
      {
        name: players.zengxingxin,
        character: goodmen.villager,
      },
      {
        name: players.liuruoran,
        character: goodmen.seer,
      },
      {
        name: players.liushan,
        character: goodmen.villager,
      },
      {
        name: players.linchen,
        character: goodmen.witcher,
      },
      {
        name: players.duweike,
        character: goodmen.villager,
      },
      {
        name: players.zenglei,
        character: goodmen.villager,
      },
      {
        name: players.liucong,
        character: goodmen.cupid,
      },
      {
        name: players.xiaozihang,
        character: goodmen.guard,
      },
      {
        name: players.yuyang,
        character: goodmen.hunter,
      },
    ],
  },
  {
    date: '2 Feb 2018',
    round: '2',
    winSide: 'goodmen',
    players: [
      {
        name: players.zengxingxin,
        character: goodmen.seer,
      },
      {
        name: players.liuruoran,
        character: goodmen.villager,
      },
      {
        name: players.liushan,
        character: goodmen.witcher,
      },
      {
        name: players.linchen,
        character: goodmen.villager,
      },
      {
        name: players.duweike,
        character: goodmen.hunter,
      },
      {
        name: players.sundi,
        character: goodmen.villager,
      },
      {
        name: players.wangpei,
        character: wolves.normal,
      },
      {
        name: players.hewei,
        character: wolves.normal,
      },
      {
        name: players.yangyi,
        character: wolves.normal,
      },
    ],
  },
];
