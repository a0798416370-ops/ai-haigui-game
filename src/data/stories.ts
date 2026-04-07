import type { Story } from '../types';

export const stories: Story[] = [
  // ── Difficulty 1 · 入门 ── stuckThreshold=3, maxHints=5
  {
    id: 'soup_001',
    title: '最后一支烟',
    difficulty: 1,
    estimated_minutes: 10,
    tags: ['反转', '轻松'],
    surface: '一个男人抽完最后一支烟后，笑着死去了。',
    bottom: '他是一名死刑犯。最后一支烟是刑前仪式的一部分，他笑着接受是因为终于得到了解脱，结束了漫长的煎熬。',
    key_points: [
      { point: '他是死刑犯', importance: 'critical' },
      { point: '最后一支烟是刑前仪式', importance: 'critical' },
      { point: '他笑是因为终于解脱', importance: 'supporting' },
    ],
    reasoning_path: [
      { layer: 1, clue: '那个地方有非常特殊的规则', hint: '场景维度' },
      { layer: 2, clue: '他的身份不是普通人', hint: '身份维度' },
      { layer: 3, clue: '他为什么笑着接受这个结局', hint: '动机维度' },
    ],
    hint_templates: [
      { type: 'context', hint: '那个地方，以及那个时刻，有它自己独特的规则。' },
      { type: 'identity', hint: '也许他的身份，比你想象的更特殊一些。' },
      { type: 'emotion', hint: '他为什么笑——也许笑比哭更值得深思。' },
    ],
    key_clue: '这件事发生在一个拥有非常特殊规则的地方，那里有句老话叫「最后一支」。',
  },

  // ── Difficulty 2 · 简单 ── stuckThreshold=4, maxHints=4
  {
    id: 'soup_002',
    title: '电梯里的女人',
    difficulty: 2,
    estimated_minutes: 15,
    tags: ['悬疑', '日常'],
    surface: '电梯在15楼下行时突然失控坠落，电梯里只有一名女子幸存，而她的第一句话是「我没事」。',
    bottom: '她其实已经死了——或者说，她的意识在坠落的瞬间被困在了电梯里。「我没事」是她生前最后习惯性说出口的话，是大脑的机械反应。真正的她早已在坠落的瞬间失去了生命迹象。',
    key_points: [
      { point: '她已经死亡', importance: 'critical' },
      { point: '「我没事」是临死前的本能反应', importance: 'critical' },
      { point: '坠楼瞬间意识短暂存续', importance: 'supporting' },
    ],
    reasoning_path: [
      { layer: 1, clue: '电梯失控坠落，通常无人生还', hint: '场景维度' },
      { layer: 2, clue: '「我没事」这句话在语境上存在矛盾', hint: '上下文维度' },
      { layer: 3, clue: '生与死的边界在哪里', hint: '身份维度' },
    ],
    hint_templates: [
      { type: 'context', hint: '想想看，一个人说完「我没事」之后，接下来会发生什么？' },
      { type: 'time', hint: '有时候，大脑的反应速度会稍稍领先于身体。' },
      { type: 'identity', hint: '这句话，究竟是说给谁听的？' },
    ],
    key_clue: '她的话是说给她自己听的——或者说，是她的大脑替她说的。',
  },

  // ── Difficulty 3 · 普通 ── stuckThreshold=5, maxHints=3
  {
    id: 'soup_003',
    title: '镜中的笑容',
    difficulty: 3,
    estimated_minutes: 20,
    tags: ['悬疑', '反转'],
    surface: '一个男人照镜子时，对着自己笑了。然后他愣住了，因为他不确定镜子里的人是不是自己。',
    bottom: '他是一位面部严重烧伤的整形者。刚做完一场漫长而痛苦的手术，脸上缠满绷带。他想看看手术效果，但绷带还没拆——镜子里看到的，是一个完全陌生的、缠满绷带的脸。在那一瞬间，他无法确认镜中那个「人」是否还是自己。',
    key_points: [
      { point: '他刚接受了面部整形手术', importance: 'critical' },
      { point: '镜中看到的是缠满绷带的陌生面容', importance: 'critical' },
      { point: '身份认同产生了短暂的崩塌', importance: 'supporting' },
    ],
    reasoning_path: [
      { layer: 1, clue: '「不确定是不是自己」说明看到了某种异常', hint: '场景维度' },
      { layer: 2, clue: '这种异常发生在照镜子之后', hint: '时间维度' },
      { layer: 3, clue: '一个人为什么会在自己的脸上感到陌生', hint: '身份维度' },
    ],
    hint_templates: [
      { type: 'identity', hint: '试着从「他刚经历了什么」这个角度去想。' },
      { type: 'perspective', hint: '如果你是一个刚刚经历了重大改变的人，看到镜子里的自己会有何感受？' },
      { type: 'context', hint: '想象一下绷带、手术、疼痛——这一切之后，一个人最想确认的是什么？' },
    ],
    key_clue: '他刚刚经历了一场漫长的手术，脸上缠满了绷带，而镜子里的自己看起来完全不像自己。',
  },

  // ── Difficulty 4 · 困难 ── stuckThreshold=7, maxHints=2
  {
    id: 'soup_004',
    title: '那封没有署名的信',
    difficulty: 4,
    estimated_minutes: 25,
    tags: ['情感', '推理'],
    surface: '一个女人每年都会在同一个日子寄出一封信，收件地址是她自己的旧居，而她从未收到过任何回信。',
    bottom: '她曾经有一个双胞胎妹妹，在小时候意外去世。她无法释怀，于是每年在妹妹的忌日以妹妹的名义给自己寄信，试图与「另一个自己」和解。信里写的是妹妹如果还活着会说的话。而她从未收到回信——因为信都寄到了她自己的名下，而她选择不去打开。',
    key_points: [
      { point: '收件人是她自己的旧居', importance: 'critical' },
      { point: '她从未收到回信（因为是她寄给自己的）', importance: 'critical' },
      { point: '与逝去的双胞胎妹妹有关', importance: 'critical' },
      { point: '这是一个与自己和解的仪式', importance: 'supporting' },
    ],
    reasoning_path: [
      { layer: 1, clue: '如果信寄到了她自己的地址，为什么从不回信', hint: '时间维度' },
      { layer: 2, clue: '这个固定的日子有特殊含义', hint: '身份维度' },
      { layer: 3, clue: '为什么她要给一个「不存在的人」写信', hint: '动机维度' },
    ],
    hint_templates: [
      { type: 'identity', hint: '试着想想「另一个自己」这个概念——这世上谁最像你，却又不是你？' },
      { type: 'time', hint: '固定在同一个日子做同一件事，往往意味着那个日子本身有特殊意义。' },
      { type: 'motive', hint: '有些信件不是为了收到回信，而是为了说出那些从未说出口的话。' },
    ],
    key_clue: '这封信的收件人，是一个永远不会回信的人——因为她早已不在人世，却是她最熟悉的人。',
  },

  // ── Difficulty 5 · 地狱 ── stuckThreshold=10, maxHints=1
  {
    id: 'soup_005',
    title: '空荡荡的演奏厅',
    difficulty: 5,
    estimated_minutes: 30,
    tags: ['惊悚', '哲学'],
    surface: '一位著名钢琴家在空无一人的演奏厅里弹奏了一曲，弹完后他起身鞠躬，仿佛有满堂观众。',
    bottom: '他是一位阿尔茨海默症晚期的患者，已经完全遗忘了自己的过去。今晚他独自来到演奏厅，是被一段残存的肌肉记忆驱使而来——他模糊地记得自己「应该在这里弹琴」。弹奏完毕后，他的病态自尊让他条件反射地起身鞠躬：这是他身体唯一记得的、「表演结束后」该做的事。',
    key_points: [
      { point: '他患有阿尔茨海默症', importance: 'critical' },
      { point: '演奏是残存肌肉记忆的驱动', importance: 'critical' },
      { point: '鞠躬是「表演结束后」的条件反射', importance: 'critical' },
      { point: '他已忘记自己是谁、观众是谁', importance: 'supporting' },
    ],
    reasoning_path: [
      { layer: 1, clue: '演奏厅空无一人，他却像有观众一样行动', hint: '场景维度' },
      { layer: 2, clue: '他的记忆和认知已经出现了严重问题', hint: '时间维度' },
      { layer: 3, clue: '他的身体记得一些他大脑早已忘记的事', hint: '身份维度' },
    ],
    hint_templates: [
      { type: 'perspective', hint: '想想看，一个人什么都可以忘记，但有什么是身体永远不会忘记的？' },
      { type: 'identity', hint: '如果有一天你忘记了自己是谁，你还会做什么？' },
      { type: 'motive', hint: '他为什么会出现在那里——是刻意，还是被什么东西「带来」的？' },
    ],
    key_clue: '他的大脑已经忘记了自己是钢琴家，但他的身体还记得「这里该弹琴，弹完该鞠躬」。',
  },
];
