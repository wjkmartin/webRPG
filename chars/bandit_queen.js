import dialogue from './dialogues/d_bandit_queen.js';

export default 
{
  actorName: 'Jayde, The Queenpin',
  actorClass: 'Bandit Nobility',
  race: 'Human',
  level: 7,
  health: 200,
  maxHealth: 200,
  stamina: 200,
  maxStamina: 200,
  mana: 30,
  maxMana: 30,
  armor: 5,
  dodge: 10,
  focus: 33,
  strength: 13,
  dexterity: 18,
  constitution: 15,
  charisma: 15,
  wisdom: 13,
  intelligence: 12,
  isDead: false,
  hasFocusSpell: false,
  visited: [],
  location: 'docks',
  dialogueTree: dialogue,
  expVal: 100,
};