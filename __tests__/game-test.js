import {createPlayers, INITIAL_ROLES, shuffle, dealRoles} from '../game/setup';
import {
  getInvestigationRole,
  getRoleImage,
  fallbackRoleImage,
} from '../game/roles';

it('creates independent ten-player rosters with the original role balance', () => {
  const first = createPlayers();
  const second = createPlayers();
  first[0].name = 'Alex';
  expect(second[0]).toEqual({pos: 0, name: 'Player 1', role: 'Default'});
  expect(second).toHaveLength(10);
  expect(INITIAL_ROLES.filter(role => role === 'Citizen')).toHaveLength(6);
  expect(INITIAL_ROLES.filter(role => role === 'Mafia')).toHaveLength(2);
  expect(INITIAL_ROLES).toEqual(expect.arrayContaining(['Sheriff', 'Don']));
});

it('shuffles a copy with the existing Fisher–Yates algorithm', () => {
  const random = jest.spyOn(Math, 'random').mockReturnValue(0);
  const input = [1, 2, 3, 4];
  expect(shuffle(input)).toEqual([2, 3, 4, 1]);
  expect(input).toEqual([1, 2, 3, 4]);
  random.mockRestore();
});

it('hides the Don in investigation results and retains the fallback artwork', () => {
  expect(getInvestigationRole('Don')).toBe('Mafia');
  expect(getInvestigationRole('Sheriff')).toBe('Sheriff');
  expect(getInvestigationRole('Citizen')).toBe('Citizen');
  expect(getRoleImage('Unknown')).toBe(fallbackRoleImage);
  expect(getRoleImage('toString')).toBe(fallbackRoleImage);
});

it('deals names and roles without mutating the previous player objects', () => {
  const original = createPlayers();
  const names = original.map((_, index) => `Guest ${index + 1}`);
  const dealt = dealRoles(original, names, INITIAL_ROLES);
  expect(original[0]).toEqual({pos: 0, name: 'Player 1', role: 'Default'});
  expect(dealt[0]).toEqual({pos: 0, name: 'Guest 1', role: 'Sheriff'});
  expect(dealt.every((player, index) => player !== original[index])).toBe(true);
});
