/**
 * Hilarious, Laugh-Out-Loud 2-Companion Conversations
 * Light, witty, goofy, and laugh-out-loud funny regardless of the topic!
 * Contains 500+ unique jokes & dialogues per category (6,200+ total jokes).
 */

import { EXPANDED_JOKE_BANKS } from '../data/expandedJokeBanks';

export const ANIMAL_CHARACTERS = [
  { id: 'cat', name: 'Luna', icon: '🐱', label: 'Cat' },
  { id: 'dog', name: 'Mochi', icon: '🐶', label: 'Shiba' },
  { id: 'owl', name: 'Archie', icon: '🦉', label: 'Owl' },
  { id: 'fox', name: 'Foxy', icon: '🦊', label: 'Fox' },
  { id: 'panda', name: 'Bao', icon: '🐼', label: 'Panda' },
  { id: 'bunny', name: 'Pip', icon: '🐰', label: 'Bunny' },
  { id: 'penguin', name: 'Pebble', icon: '🐧', label: 'Penguin' },
  { id: 'raccoon', name: 'Bandit', icon: '🦝', label: 'Raccoon' },
  { id: 'otter', name: 'Ollie', icon: '🦦', label: 'Otter' },
  { id: 'koala', name: 'Koa', icon: '🐨', label: 'Koala' },
  { id: 'frog', name: 'Kero', icon: '🐸', label: 'Frog' },
  { id: 'turtle', name: 'Toby', icon: '🐢', label: 'Turtle' },
  { id: 'hedgehog', name: 'Quill', icon: '🦔', label: 'Hedgehog' },
  { id: 'dino', name: 'Neo', icon: '🦖', label: 'Dino' },
  { id: 'bear', name: 'Barnaby', icon: '🐻', label: 'Bear' },
  { id: 'duck', name: 'Ducky', icon: '🦆', label: 'Duck' },
  { id: 'squirrel', name: 'Nutty', icon: '🐿️', label: 'Squirrel' },
  { id: 'hamster', name: 'Hammy', icon: '🐹', label: 'Hamster' },
  { id: 'seal', name: 'Snooze', icon: '🦭', label: 'Seal' },
  { id: 'deer', name: 'Bambi', icon: '🦌', label: 'Deer' },
  { id: 'chick', name: 'Sunny', icon: '🐥', label: 'Chick' },
  { id: 'mouse', name: 'Mickey', icon: '🐭', label: 'Mouse' }
];

const TOPIC_METADATA = {
  planets: { title: 'Space & Planets', tag: 'Space Comedy' },
  ghosts: { title: 'Ghost Stories & Spooky Fun', tag: 'Spooky Goofs' },
  dreams: { title: 'Crazy Dreams', tag: 'Dream Goofs' },
  funny: { title: 'Human Quirks', tag: 'Human Comedy' },
  serious: { title: 'Goofy Philosophy', tag: 'Silly Wisdom' },
  food: { title: 'Snack Scandals', tag: 'Snack Drama' },
  space_mysteries: { title: 'Cosmic Riddles', tag: 'Space Laughs' },
  ancient: { title: 'Dino Troubles', tag: 'Dino Goofs' },
  ocean: { title: 'Deep Sea Shenanigans', tag: 'Ocean Goofs' },
  chill: { title: 'Lazy Masterclass', tag: 'Lazy Humor' },
  cheating_husband: { title: 'Husband Caught Red-Handed', tag: 'Cheating Drama' },
  cheating_wife: { title: 'Wife Secret Affairs & Soap Opera', tag: 'Spouse Drama' }
};

// Build high-volume SAGA_TOPICS combining meta and 500+ generated dialogues
export const SAGA_TOPICS = {};

for (const [topicKey, meta] of Object.entries(TOPIC_METADATA)) {
  const bank = EXPANDED_JOKE_BANKS[topicKey];
  SAGA_TOPICS[topicKey] = {
    id: topicKey,
    title: meta.title,
    tag: meta.tag,
    totalJokes: bank ? bank.totalPairs : 520,
    dialogues: bank ? bank.dialogues : []
  };
}

export function getSagaForTopic(topicId) {
  return SAGA_TOPICS[topicId] || SAGA_TOPICS.planets;
}
