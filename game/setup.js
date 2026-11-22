/** Fixed ten-player ruleset: one Sheriff, one Don, two Mafia, six Citizens. */
export const PLAYER_COUNT = 10;
export const INITIAL_ROLES = [
  'Sheriff',
  'Don',
  'Mafia',
  'Mafia',
  'Citizen',
  'Citizen',
  'Citizen',
  'Citizen',
  'Citizen',
  'Citizen',
];

export const createPlayerNames = () =>
  Array.from({length: PLAYER_COUNT}, (_, index) => `Player ${index + 1}`);

export const createPlayers = () =>
  createPlayerNames().map((name, pos) => ({pos, name, role: 'Default'}));

/** Fisher–Yates shuffle; keep the input intact for React state updates. */
export function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}
