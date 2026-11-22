import React from 'react';
import renderer, {act} from 'react-test-renderer';
import SeatingScreen from '../screens/SeatingScreen';
import NightActionScreen from '../screens/NightActionScreen';
import {Action} from '../ui/components';

jest.mock('../game/audio', () => ({
  loadSound: jest.fn(() => ({})),
  playSound: jest.fn(),
}));

it.each([
  ['Citizen', 'replace', 'Night'],
  ['Mafia', 'navigate', 'Kill'],
  ['Don', 'navigate', 'Kill'],
  ['Sheriff', 'navigate', 'Check'],
])('preserves the %s night action', (role, method, route) => {
  const players = [{name: 'Alex', role}];
  const navigation = {
    state: {
      params: {
        players_data: players,
        temp_counter: 0,
        temp_kill_choice: 'true',
      },
    },
    replace: jest.fn(),
    navigate: jest.fn(),
  };
  const tree = renderer.create(<NightActionScreen navigation={navigation} />);
  tree.root.findByType(Action).props.onPress();
  expect(navigation[method]).toHaveBeenCalledWith(
    route,
    expect.objectContaining({players_data: players, temp_counter: 0}),
  );
  tree.unmount();
});

it('moves the last Citizen to daybreak with the current vote result', () => {
  const players = Array.from({length: 10}, (_, index) => ({
    name: `Player ${index + 1}`,
    role: 'Citizen',
  }));
  const navigation = {
    state: {
      params: {
        players_data: players,
        temp_counter: 9,
        temp_kill_choice: 'false',
      },
    },
    replace: jest.fn(),
  };
  const tree = renderer.create(<NightActionScreen navigation={navigation} />);
  tree.root.findByType(Action).props.onPress();
  expect(navigation.replace).toHaveBeenCalledWith('Second_Day', {
    players_data: players,
    temp_kill_choice: 'false',
  });
  tree.unmount();
});

it('hands the freshly dealt roster to the reveal screen without mutating setup state', () => {
  const names = Array.from({length: 10}, (_, index) => `Guest ${index + 1}`);
  const navigation = {
    state: {params: {listings: names, randomize: false}},
    replace: jest.fn(),
  };
  const tree = renderer.create(<SeatingScreen navigation={navigation} />);
  const original = tree.getInstance().state.players;
  act(() => tree.root.findByType(Action).props.onPress());
  const [route, params] = navigation.replace.mock.calls[0];
  expect(route).toBe('Details');
  expect(params.players_data.map(player => player.name)).toEqual(names);
  expect(
    params.players_data.filter(player => player.role === 'Mafia'),
  ).toHaveLength(2);
  expect(original.every(player => player.role === 'Default')).toBe(true);
  tree.unmount();
  jest.clearAllTimers();
});
